import { useHiring } from '../contexts/HiringContext'
import { uniqueCategories, uniqueLocations } from '../data/candidates'
import { Card, CardContent } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Slider } from './ui/slider'

const FiltersPanel = () => {
  const { filters, handleFilterChange, hasActiveFilters } = useHiring()

  return (
    <Card className="p-8 bg-white rounded-2xl shadow-lg">
      <CardContent>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Smart Filters</h3>

        <div className="space-y-6">
          {/* Category */}
          <div>
            <Label className="mb-2">Category</Label>
            <select
              value={filters.category}
              onChange={e => handleFilterChange('category', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <Label className="mb-2">Experience Level</Label>
            <select
              value={filters.experienceLevel}
              onChange={e => handleFilterChange('experienceLevel', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Levels</option>
              <option value="Entry">Entry Level</option>
              <option value="Junior">Junior Level</option>
              <option value="Mid-Level">Mid Level</option>
              <option value="Senior">Senior Level</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <Label className="mb-2">Location</Label>
            <select
              value={filters.location}
              onChange={e => handleFilterChange('location', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Skills */}
          <div>
            <Label className="mb-2">Skills</Label>
            <Input
              type="text"
              placeholder="e.g. React, Python..."
              value={filters.skills}
              onChange={e => handleFilterChange('skills', e.target.value)}
              className="p-3"
            />
          </div>

          {/* Min Score slider only when any filter is applied */}
          {hasActiveFilters && (
            <div>
              <Label className="mb-2">Min Score: {filters.minScore}%</Label>
              <Slider
                value={[filters.minScore]}
                onValueChange={val => handleFilterChange('minScore', val[0])}
                max={100}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default FiltersPanel
