import React, { createContext, useContext, useState, useMemo } from 'react'
import { candidatesData, getFilteredCandidates, getCandidatesWithScores } from '../data/candidates'

const HiringContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useHiring = () => {
  const context = useContext(HiringContext)
  if (!context) {
    throw new Error('useHiring must be used within a HiringProvider')
  }
  return context
}

export const HiringProvider = ({ children }) => {
  const [selectedTeam, setSelectedTeam] = useState([])
  const [shortlistedCandidates, setShortlistedCandidates] = useState([])
  const [filters, setFilters] = useState({
    category: '',
    experienceLevel: '',
    location: '',
    skills: '',
    minScore: 0
  })
  const [currentView, setCurrentView] = useState('all')
  const [toast, setToast] = useState(null) // New state for toast notifications

  // Get candidates with dynamic scores based on current filters
  const candidatesWithScores = useMemo(() => {
    return getCandidatesWithScores(filters)
  }, [filters])

  // Filtered candidates based on current filters
  const filteredCandidates = useMemo(() => {
    return getFilteredCandidates(filters)
  }, [filters])

  // FIXED: Candidates to display based on current view
  const displayedCandidates = useMemo(() => {
    switch (currentView) {
      case 'shortlisted': {
        // For shortlisted view, show ALL shortlisted candidates regardless of filters
        // but apply dynamic scoring based on current filters
        const shortlistedCandidateIds = new Set(shortlistedCandidates)
        return candidatesWithScores.filter(c => shortlistedCandidateIds.has(c.id))
      }
      
      case 'selected': {
        // For selected view, show ALL selected candidates regardless of filters
        // but apply dynamic scoring based on current filters  
        const selectedCandidateIds = new Set(selectedTeam.map(t => t.id))
        return candidatesWithScores.filter(c => selectedCandidateIds.has(c.id))
      }
      
      default: {
        // For 'all' view, show filtered candidates
        return filteredCandidates
      }
    }
  }, [filteredCandidates, candidatesWithScores, currentView, shortlistedCandidates, selectedTeam])

  // Check if any filters are active (for UI purposes)
  const hasActiveFilters = useMemo(() => {
    return filters.category || filters.experienceLevel || 
           filters.location || filters.skills || filters.minScore > 0
  }, [filters])

  // Calculate diversity score
  const diversityScore = useMemo(() => {
    if (selectedTeam.length === 0) return 0

    const categories = new Set(selectedTeam.map(t => t.category))
    const locations = new Set(selectedTeam.map(t => t.location))
    const experiences = new Set(selectedTeam.map(t => t.experienceLevel))
    
    const categoryScore = (categories.size / Math.min(selectedTeam.length, 5)) * 40
    const locationScore = (locations.size / Math.min(selectedTeam.length, 5)) * 35
    const experienceScore = (experiences.size / Math.min(selectedTeam.length, 4)) * 25
    
    return Math.round(categoryScore + locationScore + experienceScore)
  }, [selectedTeam])

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000) // Auto-hide after 3 seconds
  }

  // Enhanced diverse team selection algorithm
  const calculateDiversityScore = (team) => {
    if (team.length === 0) return 0
    
    const categories = new Set(team.map(t => t.category))
    const locations = new Set(team.map(t => t.location))
    const experiences = new Set(team.map(t => t.experienceLevel))
    
    const categoryScore = (categories.size / Math.min(team.length, 5)) * 40
    const locationScore = (locations.size / Math.min(team.length, 5)) * 35
    const experienceScore = (experiences.size / Math.min(team.length, 4)) * 25
    
    return Math.round(categoryScore + locationScore + experienceScore)
  }

  // Generate multiple team combinations and select the most diverse (aiming for 100%)
  const generateDiverseTeamOptions = (candidates, attempts = 100) => {
    const sortedCandidates = [...candidates].sort((a, b) => (b.score || 0) - (a.score || 0))
    let bestTeam = []
    let bestScore = -1
    
    // Get available diversity options
    const availableCategories = [...new Set(sortedCandidates.map(c => c.category))]
    const availableLocations = [...new Set(sortedCandidates.map(c => c.location))]
    const availableExperiences = [...new Set(sortedCandidates.map(c => c.experienceLevel))]
    
    // Calculate maximum possible diversity score
    const maxCategories = Math.min(5, availableCategories.length)
    const maxLocations = Math.min(5, availableLocations.length)
    const maxExperiences = Math.min(5, availableExperiences.length)
    const theoreticalMaxScore = Math.round(
      (maxCategories / 5) * 40 + 
      (maxLocations / 5) * 35 + 
      (maxExperiences / 5) * 25
    )
    
    for (let attempt = 0; attempt < attempts; attempt++) {
      const team = []
      const usedCategories = new Set()
      const usedLocations = new Set()
      const usedExperiences = new Set()
      
      // Strategy 1: Perfect diversity first - one from each category
      const shuffledCategories = [...availableCategories].sort(() => Math.random() - 0.5)
      
      for (const category of shuffledCategories.slice(0, 5)) {
        if (team.length >= 5) break
        
        const categoryOptions = sortedCandidates.filter(c => 
          c.category === category && !team.some(t => t.id === c.id)
        )
        
        if (categoryOptions.length > 0) {
          // Prioritize candidates that also add location/experience diversity
          const diversityScored = categoryOptions.map(candidate => {
            let diversityValue = candidate.score || 0
            
            // Huge bonus for new location
            if (!usedLocations.has(candidate.location)) diversityValue += 100
            // Huge bonus for new experience level
            if (!usedExperiences.has(candidate.experienceLevel)) diversityValue += 80
            
            return { ...candidate, diversityValue }
          }).sort((a, b) => b.diversityValue - a.diversityValue)
          
          // Select from top diversity candidates with some randomness
          const topDiversityCandidates = diversityScored.slice(0, Math.min(2, diversityScored.length))
          const selected = topDiversityCandidates[Math.floor(Math.random() * topDiversityCandidates.length)]
          
          team.push(selected)
          usedCategories.add(selected.category)
          usedLocations.add(selected.location)
          usedExperiences.add(selected.experienceLevel)
        }
      }
      
      // Strategy 2: Fill remaining slots to maximize diversity
      while (team.length < 5) {
        const remaining = sortedCandidates.filter(c => !team.some(t => t.id === c.id))
        if (remaining.length === 0) break
        
        // Calculate diversity contribution for each remaining candidate
        const diversityScored = remaining.map(candidate => {
          let diversityValue = candidate.score || 0
          
          // Massive bonus for completing diversity categories
          if (!usedCategories.has(candidate.category)) diversityValue += 200
          if (!usedLocations.has(candidate.location)) diversityValue += 150
          if (!usedExperiences.has(candidate.experienceLevel)) diversityValue += 100
          
          return { ...candidate, diversityValue }
        }).sort((a, b) => b.diversityValue - a.diversityValue)
        
        // Always pick the most diversity-contributing candidate
        const selected = diversityScored[0]
        team.push(selected)
        usedCategories.add(selected.category)
        usedLocations.add(selected.location)
        usedExperiences.add(selected.experienceLevel)
      }
      
      const teamDiversityScore = calculateDiversityScore(team)
      
      // Prefer teams that achieve higher diversity scores
      if (teamDiversityScore > bestScore) {
        bestScore = teamDiversityScore
        bestTeam = [...team]
        
        // If we achieve maximum possible diversity, we can stop early
        if (teamDiversityScore >= theoreticalMaxScore) {
          break
        }
      }
    }
    
    return { team: bestTeam, score: bestScore, maxPossible: theoreticalMaxScore }
  }

  // Event handlers
  const handleSelectCandidate = (candidateId) => {
    // Find candidate from the candidates with scores to preserve score info
    const candidate = candidatesWithScores.find(c => c.id === candidateId) || 
                     candidatesData.find(c => c.id === candidateId)
    
    if (selectedTeam.some(t => t.id === candidateId)) {
      setSelectedTeam(prev => prev.filter(t => t.id !== candidateId))
    } else if (selectedTeam.length < 5) {
      setSelectedTeam(prev => [...prev, candidate])
    }
  }

  const handleShortlistCandidate = (candidateId) => {
    setShortlistedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    )
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  // ADDED: Helper function to clear all shortlisted candidates
  const clearShortlist = () => {
    setShortlistedCandidates([])
  }

  // ADDED: Helper function to clear all selected candidates
  const clearSelectedTeam = () => {
    setSelectedTeam([])
  }

  const autoSelectDiverseTeam = () => {
    const currentDiversityScore = diversityScore
    
    // Use candidates with scores if filters are active, otherwise use base scoring
    const candidatesToUse = hasActiveFilters 
      ? candidatesWithScores.filter(c => c.score !== null)
      : candidatesData.map(c => ({
          ...c,
          score: 50 + Math.min(c.work_experiences.length * 5, 25) + 
                (c.education.highest_level.includes("Master's") || c.education.highest_level.includes("J.D") ? 15 : 0) +
                (c.education.degrees?.some(d => d.isTop50) ? 10 : 0) +
                Math.min(c.skills.length * 2, 10) +
                (c.work_experiences.map(exp => exp.roleName.toLowerCase()).join(' ').includes('senior') ? 10 : 0)
        }))

    // Generate the most diverse team possible (aiming for 100%)
    const { team: newTeam, score: newDiversityScore, maxPossible } = generateDiverseTeamOptions(candidatesToUse)
    
    setSelectedTeam(newTeam)
    
    // Show appropriate toast message based on diversity achievement
    if (newDiversityScore === 100) {
      showToast(`🏆 Perfect diversity achieved! 100% diverse team selected!`, 'success')
    } else if (newDiversityScore >= maxPossible) {
      showToast(`🌟 Maximum possible diversity achieved! ${newDiversityScore}% (theoretical max: ${maxPossible}%)`, 'success')
    } else if (newDiversityScore > currentDiversityScore) {
      showToast(`🎉 Diversity improved from ${currentDiversityScore}% to ${newDiversityScore}% (targeting 100%)`, 'success')
    } else if (newDiversityScore === currentDiversityScore && currentDiversityScore > 0) {
      showToast(`✨ Alternative ${newDiversityScore}% diverse team selected (aiming for 100%)`, 'info')
    } else {
      showToast(`🔄 ${newDiversityScore}% diverse team selected (targeting maximum diversity)`, 'success')
    }
    
    // Auto-switch to selected view to show the new team
    setCurrentView('selected')
  }

  const exportTeamData = () => {
    // Calculate average score, handling null scores
    const scoresForAverage = selectedTeam.map(t => t.score).filter(score => score !== null)
    const averageScore = scoresForAverage.length > 0 
      ? Math.round(scoresForAverage.reduce((sum, score) => sum + score, 0) / scoresForAverage.length)
      : 'N/A'

    const teamData = {
      selectedTeam,
      diversityScore,
      totalApplicants: candidatesData.length,
      shortlistedCount: shortlistedCandidates.length,
      selectionDate: new Date().toISOString(),
      filtersUsed: filters,
      teamInsights: {
        averageScore,
        salaryRange: {
          min: Math.min(...selectedTeam.map(t => t.salaryExpectation)),
          max: Math.max(...selectedTeam.map(t => t.salaryExpectation))
        },
        categoriesCount: new Set(selectedTeam.map(t => t.category)).size,
        hasScores: selectedTeam.some(t => t.score !== null)
      }
    }
    
    const dataStr = JSON.stringify(teamData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'selected_team_data.json'
    link.click()
    URL.revokeObjectURL(url)
    
    showToast('📊 Team data exported successfully!', 'success')
  }

  const value = {
    // Data
    candidates: candidatesData,
    candidatesWithScores,
    filteredCandidates,
    displayedCandidates,
    selectedTeam,
    shortlistedCandidates,
    diversityScore,
    toast, // Added toast state
    
    // State
    filters,
    currentView,
    hasActiveFilters,
    
    // Actions
    handleSelectCandidate,
    handleShortlistCandidate,
    handleFilterChange,
    setCurrentView,
    autoSelectDiverseTeam,
    exportTeamData,
    clearShortlist,
    clearSelectedTeam,
    showToast // Added toast helper
  }

  return (
    <HiringContext.Provider value={value}>
      {children}
    </HiringContext.Provider>
  )
}