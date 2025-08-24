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
  const [toast, setToast] = useState(null)

  const candidatesWithScores = useMemo(() => getCandidatesWithScores(filters), [filters])
  const filteredCandidates = useMemo(() => getFilteredCandidates(filters), [filters])

  const displayedCandidates = useMemo(() => {
    switch (currentView) {
      case 'shortlisted': {
        const shortlistedIds = new Set(shortlistedCandidates)
        return candidatesWithScores.filter(c => shortlistedIds.has(c.id))
      }
      case 'selected': {
        const selectedIds = new Set(selectedTeam.map(t => t.id))
        return candidatesWithScores.filter(c => selectedIds.has(c.id))
      }
      default:
        return filteredCandidates
    }
  }, [filteredCandidates, candidatesWithScores, currentView, shortlistedCandidates, selectedTeam])

  const hasActiveFilters = useMemo(() => {
    return filters.category || filters.experienceLevel || filters.location || filters.skills || filters.minScore > 0
  }, [filters])

  const diversityScore = useMemo(() => {
    if (!selectedTeam.length) return 0
    const categories = new Set(selectedTeam.map(t => t.category))
    const locations = new Set(selectedTeam.map(t => t.location))
    const experiences = new Set(selectedTeam.map(t => t.experienceLevel))

    const categoryScore = (categories.size / Math.min(selectedTeam.length, 5)) * 40
    const locationScore = (locations.size / Math.min(selectedTeam.length, 5)) * 35
    const experienceScore = (experiences.size / Math.min(selectedTeam.length, 4)) * 25

    return Math.round(categoryScore + locationScore + experienceScore)
  }, [selectedTeam])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Event handlers
  const handleSelectCandidate = (candidateId) => {
    const candidate = candidatesWithScores.find(c => c.id === candidateId) || candidatesData.find(c => c.id === candidateId)
    if (selectedTeam.some(t => t.id === candidateId)) {
      setSelectedTeam(prev => prev.filter(t => t.id !== candidateId))
    } else if (selectedTeam.length < 5) {
      setSelectedTeam(prev => [...prev, candidate])
    }
  }

  const handleShortlistCandidate = (candidateId) => {
    setShortlistedCandidates(prev => prev.includes(candidateId) ? prev.filter(id => id !== candidateId) : [...prev, candidateId])
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  // Reset helpers
  const clearShortlist = () => setShortlistedCandidates([])
  const clearSelectedTeam = () => setSelectedTeam([])
  const resetFilters = () => setFilters({
    category: '',
    experienceLevel: '',
    location: '',
    skills: '',
    minScore: 0
  })

  // Combined reset function
  const clearAllSelections = () => {
    clearSelectedTeam()
    clearShortlist()
    resetFilters()
    showToast('🔄 All selections and filters have been reset!', 'success')
  }

  const value = {
    candidates: candidatesData,
    candidatesWithScores,
    filteredCandidates,
    displayedCandidates,
    selectedTeam,
    shortlistedCandidates,
    diversityScore,
    toast,
    filters,
    currentView,
    hasActiveFilters,
    handleSelectCandidate,
    handleShortlistCandidate,
    handleFilterChange,
    setCurrentView,
    clearShortlist,
    clearSelectedTeam,
    resetFilters,
    clearAllSelections, // ✅ Exposed function for header or other components
    showToast
  }

  return (
    <HiringContext.Provider value={value}>
      {children}
    </HiringContext.Provider>
  )
}
