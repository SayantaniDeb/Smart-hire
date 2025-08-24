import React, { useMemo } from 'react'
import { useHiring } from '../contexts/HiringContext'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#87d068']

const Analytics = () => {
  const { selectedTeam, candidates, filteredCandidates, filters } = useHiring()

  const analyticsData = useMemo(() => {
    let dataSource = candidates
    let sourceType = 'all'

    if (selectedTeam && selectedTeam.length > 0) {
      dataSource = selectedTeam
      sourceType = 'selected'
    } else if (filteredCandidates && filteredCandidates.length > 0) {
      dataSource = filteredCandidates
      sourceType = 'filtered'
    }

    const hasActiveFilters = filters && (
      filters.category || filters.experienceLevel || 
      filters.location || filters.skills || filters.minScore > 0
    )

    // Role Categories
    const categoryData = dataSource.reduce((acc, candidate) => {
      if (candidate && candidate.category) {
        acc[candidate.category] = (acc[candidate.category] || 0) + 1
      }
      return acc
    }, {})

    // Locations - Top 10 + Other
    const locationData = dataSource.reduce((acc, candidate) => {
      if (candidate && candidate.location) {
        acc[candidate.location] = (acc[candidate.location] || 0) + 1
      }
      return acc
    }, {})
    const locationEntries = Object.entries(locationData).sort(([, a], [, b]) => b - a)
    const topLocations = locationEntries.slice(0, 10)
    const otherCount = locationEntries.slice(10).reduce((sum, [, value]) => sum + value, 0)
    const locations = [
      ...topLocations.map(([name, value]) => ({ name, value })),
      ...(otherCount > 0 ? [{ name: 'Other', value: otherCount }] : [])
    ]

    // Experience Levels
    const experienceData = dataSource.reduce((acc, candidate) => {
      if (candidate && candidate.experienceLevel) {
        acc[candidate.experienceLevel] = (acc[candidate.experienceLevel] || 0) + 1
      }
      return acc
    }, {})

    // Skills
    const skillsData = dataSource.reduce((acc, candidate) => {
      if (candidate && candidate.skills && Array.isArray(candidate.skills)) {
        candidate.skills.forEach(skill => {
          if (skill && typeof skill === 'string' && skill.trim()) {
            const trimmedSkill = skill.trim()
            acc[trimmedSkill] = (acc[trimmedSkill] || 0) + 1
          }
        })
      }
      return acc
    }, {})

    return {
      categories: Object.entries(categoryData).map(([name, value]) => ({ name, value })),
      locations: locations,
      experience: Object.entries(experienceData).map(([name, value]) => ({ name, value })),
      skills: Object.entries(skillsData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, value]) => ({ name, value })),
      totalCandidates: dataSource.length,
      sourceType,
      hasActiveFilters
    }
  }, [selectedTeam, candidates, filteredCandidates, filters])

  const getChartTitle = (baseTitle) => {
    if (analyticsData.sourceType === 'selected') {
      return `${baseTitle} (Selected Team)`
    } else if (analyticsData.hasActiveFilters) {
      return `${baseTitle} (Filtered Results)`
    }
    return `${baseTitle} (All Candidates)`
  }

  const getDataSourceDescription = () => {
    if (analyticsData.sourceType === 'selected') {
      return `Showing ${analyticsData.totalCandidates} selected team members`
    } else if (analyticsData.hasActiveFilters) {
      return `Showing ${analyticsData.totalCandidates} filtered candidates`
    }
    return `Showing all ${analyticsData.totalCandidates} candidates`
  }

  return (
    <div className="space-y-6">
      {/* Data Source Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-blue-800">Analytics Data Source</h3>
            <p className="text-sm text-blue-600">{getDataSourceDescription()}</p>
          </div>
          {analyticsData.hasActiveFilters && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Filters Active
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Role Categories */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📊 {getChartTitle('Role Categories')}
          </h3>
          {analyticsData.categories.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">No category data available</div>
          )}
        </div>

        {/* Experience Levels */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📈 {getChartTitle('Experience Levels')}
          </h3>
          {analyticsData.experience.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analyticsData.experience}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">No experience data available</div>
          )}
        </div>

        {/* Geographic Distribution (Bar) */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🌍 {getChartTitle('Geographic Distribution')}
          </h3>
          {analyticsData.locations.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                data={analyticsData.locations}
                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">No location data available</div>
          )}
        </div>

        {/* Skills (Pie Chart) */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🛠️ {getChartTitle('Top Skills')}
          </h3>
          {analyticsData.skills.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.skills}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#ffc658"
                  dataKey="value"
                >
                  {analyticsData.skills.map((entry, index) => (
                    <Cell key={`cell-skill-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">No skills data available</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics
