import { useHiring } from '../contexts/HiringContext'

const TeamInsights = () => {
  const { selectedTeam, diversityScore } = useHiring()

  if (selectedTeam.length === 0) return null

  const averageScore = Math.round(selectedTeam.reduce((sum, t) => sum + t.score, 0) / selectedTeam.length)
  const salaryMin = Math.min(...selectedTeam.map(t => t.salaryExpectation))
  const salaryMax = Math.max(...selectedTeam.map(t => t.salaryExpectation))
  const categoriesCount = new Set(selectedTeam.map(t => t.category)).size

  const getInsightReasons = () => {
    const reasons = []
    if (diversityScore >= 80) reasons.push('Excellent diversity across roles, locations, and experience levels')
    if (selectedTeam.some(t => t.category === 'Engineering')) reasons.push('Strong technical foundation with engineering expertise')
    if (selectedTeam.some(t => t.category === 'Product')) reasons.push('Product strategy and management capabilities')
    if (selectedTeam.some(t => t.category === 'Design')) reasons.push('User experience and design thinking')
    if (new Set(selectedTeam.map(t => t.location)).size > 2) reasons.push('Geographic diversity for market insights')
    if (selectedTeam.some(t => t.experienceLevel === 'Senior')) reasons.push('Senior leadership and mentorship')
    return reasons
  }

  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Team Insights</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-2">Average Score</h4>
          <p className="text-2xl font-bold text-blue-600">{averageScore}%</p>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-2">Salary Range</h4>
          <p className="text-lg font-semibold text-green-600">
            ${salaryMin.toLocaleString()} - ${salaryMax.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-2">Total Categories</h4>
          <p className="text-2xl font-bold text-purple-600">{categoriesCount}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-2">Why This Team Works:</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {getInsightReasons().map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TeamInsights