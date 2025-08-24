import { useHiring } from '../contexts/HiringContext'
import TeamMemberCard from './TeamMemberCard'

const SelectedTeam = () => {
  const { selectedTeam, diversityScore } = useHiring()

  if (selectedTeam.length === 0) return null

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        🎯 Your Selected Team ({selectedTeam.length}/5)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedTeam.map(member => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
      
      {selectedTeam.length === 5 && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            🎉 Congratulations! You've assembled your dream team of 5 candidates with a {diversityScore}% diversity score.
          </p>
        </div>
      )}
    </div>
  )
}

export default SelectedTeam