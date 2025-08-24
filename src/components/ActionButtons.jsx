import { useHiring } from '../contexts/HiringContext'
import { LucideDownload, LucideUsers } from 'lucide-react'

const ActionButtons = () => {
  const { selectedTeam, autoSelectDiverseTeam, exportTeamData } = useHiring()

  return (
    <div className="mt-8 mb-6 flex flex-col sm:flex-row gap-4">
      <button
        onClick={autoSelectDiverseTeam}
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        <LucideUsers className="w-5 h-5" />
        <span>Auto-Select Diverse Team</span>
      </button>

      {selectedTeam.length > 0 && (
        <button
          onClick={exportTeamData}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <LucideDownload className="w-5 h-5" />
          <span>Export Team Data</span>
        </button>
      )}
    </div>
  )
}

export default ActionButtons
