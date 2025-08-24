import React, { createContext, useContext, useState, useMemo } from 'react'
import { candidatesData, getFilteredCandidates, getCandidatesWithScores } from '../data/candidates'

const HiringContext = createContext()

export const useHiring = () => {
  const context = useContext(HiringContext)
  if (!context) throw new Error('useHiring must be used within a HiringProvider')
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
  const clearAllSelections = () => {
    clearSelectedTeam()
    clearShortlist()
    resetFilters()
    showToast('🔄 All selections and filters have been reset!', 'success')
  }

  // ================== AUTO SELECT ==================
  const autoSelectDiverseTeam = () => {
    const diverseTeam = []
    const categoriesUsed = new Set()
    const locationsUsed = new Set()
    const experiencesUsed = new Set()

    // Shuffle candidates to get a new combination each time
    const shuffledCandidates = [...candidatesWithScores].sort(() => Math.random() - 0.5)

    for (const candidate of shuffledCandidates) {
      if (diverseTeam.length >= 5) break
      if (
        !categoriesUsed.has(candidate.category) &&
        !locationsUsed.has(candidate.location) &&
        !experiencesUsed.has(candidate.experienceLevel)
      ) {
        diverseTeam.push(candidate)
        categoriesUsed.add(candidate.category)
        locationsUsed.add(candidate.location)
        experiencesUsed.add(candidate.experienceLevel)
      }
    }

    // Fill remaining slots if less than 5
    if (diverseTeam.length < 5) {
      for (const candidate of shuffledCandidates) {
        if (!diverseTeam.includes(candidate)) diverseTeam.push(candidate)
        if (diverseTeam.length >= 5) break
      }
    }

    setSelectedTeam(diverseTeam)
    showToast('✅ Diverse team auto-selected!', 'success')
    setCurrentView('selected')
  }

  // ================== EXPORT TEAM ==================
  const exportTeamData = () => {
    if (!selectedTeam.length) return showToast('⚠️ No team selected!', 'error')
    const csvContent = [
      ['Name', 'Category', 'Experience Level', 'Location', 'Skills'],
      ...selectedTeam.map(c => [c.name, c.category, c.experienceLevel, c.location, c.skills.join(';')])
    ].map(e => e.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'selected_team.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    showToast('📥 Team data exported!', 'success')
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
    clearAllSelections,
    autoSelectDiverseTeam,
    exportTeamData,
    showToast
  }

  return (
    <HiringContext.Provider value={value}>
      {children}
    </HiringContext.Provider>
  )
}
