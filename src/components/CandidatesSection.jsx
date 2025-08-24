import { useHiring } from '../contexts/HiringContext'
import CandidateCard from './CandidateCard'

const CandidatesSection = () => {
  const { displayedCandidates, currentView, setCurrentView } = useHiring()

  const viewButtons = [
    { key: 'all', label: 'All Candidates' },
    { key: 'shortlisted', label: 'Shortlisted' },
    { key: 'selected', label: 'Selected Team' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-wide">📋 Candidate Pool</h3>
        
        {/* View Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {viewButtons.map(view => (
            <button
              key={view.key}
              onClick={() => setCurrentView(view.key)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 whitespace-nowrap shadow-sm
                ${
                  currentView === view.key
                    ? 'bg-blue-500 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Candidate Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-8">
        {displayedCandidates.map(candidate => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
      
      {/* Empty State */}
      {displayedCandidates.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-base sm:text-lg">No candidates match your current filters.</p>
        </div>
      )}
    </div>
  )
}

export default CandidatesSection
