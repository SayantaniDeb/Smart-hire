import rawCandidatesData from './candidates.json';

// Helper functions (unchanged)
const getCategoryFromExperience = (experiences) => {
  const roles = experiences.map(exp => exp.roleName.toLowerCase()).join(' ');
  if (roles.includes('engineer') || roles.includes('developer') || roles.includes('technical')) return 'Engineering';
  if (roles.includes('design') || roles.includes('ux') || roles.includes('ui')) return 'Design';
  if (roles.includes('product') || roles.includes('manager')) return 'Product';
  if (roles.includes('legal') || roles.includes('attorney')) return 'Legal';
  if (roles.includes('marketing')) return 'Marketing';
  if (roles.includes('sales')) return 'Sales';
  return 'Other';
};

const getExperienceLevel = (experiences) => {
  const totalExp = experiences.length;
  const roles = experiences.map(exp => exp.roleName.toLowerCase()).join(' ');

  if (roles.includes('senior') || roles.includes('lead') || roles.includes('director') || roles.includes('partner')) return 'Senior';
  if (roles.includes('manager') || totalExp >= 4) return 'Mid-Level';
  if (totalExp >= 2) return 'Junior';
  return 'Entry';
};

// NEW: Dynamic scoring function based on active filters
const calculateDynamicScore = (candidate, filters) => {
  // Check if any filters are applied
  const hasActiveFilters = filters.category || filters.experienceLevel || 
                          filters.location || filters.skills || filters.minScore > 0;

  // If no filters are applied, return null (no score shown)
  if (!hasActiveFilters) {
    return null;
  }

  let score = 0;
  let maxPossibleScore = 0;

  // Category match scoring (25 points)
  if (filters.category) {
    maxPossibleScore += 25;
    if (candidate.category === filters.category) {
      score += 25;
    }
  }

  // Experience level match scoring (20 points)
  if (filters.experienceLevel) {
    maxPossibleScore += 20;
    if (candidate.experienceLevel === filters.experienceLevel) {
      score += 20;
    }
  }

  // Location match scoring (15 points)
  if (filters.location) {
    maxPossibleScore += 15;
    if (candidate.location === filters.location) {
      score += 15;
    }
  }

  // Skills match scoring (25 points)
  if (filters.skills) {
    maxPossibleScore += 25;
    const filterSkills = filters.skills.toLowerCase().split(',').map(s => s.trim()).filter(s => s);
    const candidateSkills = candidate.skills.map(s => s.toLowerCase());
    
    if (filterSkills.length > 0) {
      let matchedSkills = 0;
      filterSkills.forEach(filterSkill => {
        if (candidateSkills.some(candidateSkill => 
          candidateSkill.includes(filterSkill) || filterSkill.includes(candidateSkill)
        )) {
          matchedSkills++;
        }
      });
      
      // Score based on percentage of matched skills
      score += Math.round((matchedSkills / filterSkills.length) * 25);
    }
  }

  // General quality indicators (15 points) - always included when filters are active
  maxPossibleScore += 15;
  let qualityScore = 0;
  
  // Education bonus
  if (candidate.education.highest_level.includes("Master's") || 
      candidate.education.highest_level.includes("J.D")) {
    qualityScore += 5;
  }
  
  // Top school bonus
  if (candidate.education.degrees?.some(d => d.isTop50)) {
    qualityScore += 5;
  }
  
  // Experience diversity bonus
  if (candidate.work_experiences.length >= 3) {
    qualityScore += 5;
  }
  
  score += qualityScore;

  // Convert to percentage (0-100)
  const finalScore = maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
  
  return Math.min(finalScore, 100);
};

// REMOVED: Old static calculateCandidateScore function

// Generate IDs for raw candidates
const rawCandidatesWithIds = rawCandidatesData.map((candidate, index) => ({
  id: index + 1,
  ...candidate
}));

// Process candidates with basic calculated fields (NO static score)
export const candidatesData = rawCandidatesWithIds.map(candidate => ({
  ...candidate,
  category: getCategoryFromExperience(candidate.work_experiences),
  experienceLevel: getExperienceLevel(candidate.work_experiences),
  currentRole: candidate.work_experiences[0]?.roleName || 'Not specified',
  yearsExperience: candidate.work_experiences.length,
  salaryExpectation: parseInt(candidate.annual_salary_expectation?.['full-time']?.replace('$', '').replace(',', '')) || 0
}));

// NEW: Function to get candidates with dynamic scores based on filters
export const getCandidatesWithScores = (filters) => {
  return candidatesData.map(candidate => ({
    ...candidate,
    score: calculateDynamicScore(candidate, filters)
  })).sort((a, b) => {
    // Sort by score (highest first), but keep null scores at natural order
    if (a.score === null && b.score === null) return 0;
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score;
  });
};

// NEW: Function to apply filters and get filtered candidates
export const getFilteredCandidates = (filters) => {
  let filtered = getCandidatesWithScores(filters);

  // Apply filters
  if (filters.category) {
    filtered = filtered.filter(c => c.category === filters.category);
  }

  if (filters.experienceLevel) {
    filtered = filtered.filter(c => c.experienceLevel === filters.experienceLevel);
  }

  if (filters.location) {
    filtered = filtered.filter(c => c.location === filters.location);
  }

  if (filters.skills) {
    const filterSkills = filters.skills.toLowerCase().split(',').map(s => s.trim()).filter(s => s);
    if (filterSkills.length > 0) {
      filtered = filtered.filter(candidate => {
        const candidateSkills = candidate.skills.map(s => s.toLowerCase());
        return filterSkills.some(filterSkill => 
          candidateSkills.some(candidateSkill => 
            candidateSkill.includes(filterSkill) || filterSkill.includes(candidateSkill)
          )
        );
      });
    }
  }

  if (filters.minScore > 0) {
    filtered = filtered.filter(c => c.score !== null && c.score >= filters.minScore);
  }

  return filtered;
};

// Unique values for filters (unchanged)
export const uniqueCategories = [...new Set(candidatesData.map(c => c.category))];
export const uniqueLocations = [...new Set(candidatesData.map(c => c.location))].sort();
export const uniqueExperienceLevels = [...new Set(candidatesData.map(c => c.experienceLevel))];