import React from 'react'
import CandidateCard from './CandidateCard'

export default function CandidateList({ candidates, onShortlist }) {
  return (
    <div style={{ flex: 1 }}>
      <h2>All Candidates</h2>
      {candidates.map(candidate => (
        <CandidateCard key={candidate.id} candidate={candidate} onShortlist={onShortlist} />
      ))}
    </div>
  )
}
