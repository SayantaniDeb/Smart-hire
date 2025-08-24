import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useHiring } from '../contexts/HiringContext';
import { uniqueCategories, uniqueLocations } from '../data/candidates';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { LucideTag, LucideMapPin, LucideUser, LucideX, LucideZap } from 'lucide-react';

const mobileIcons = {
  category: <LucideTag />,
  experienceLevel: <LucideUser />,
  location: <LucideMapPin />,
  skills: <LucideZap />,
};

const FiltersPanel = () => {
  const { filters, handleFilterChange, hasActiveFilters } = useHiring();
  const [activePopup, setActivePopup] = useState(null);

  const togglePopup = (filterName) => {
    setActivePopup(activePopup === filterName ? null : filterName);
  };

  // Mobile popup portal
  const renderMobilePopup = () => {
    if (!activePopup) return null;

    return createPortal(
      <div className="fixed inset-0 z-[1000000] bg-black/30 flex justify-center items-end">
        <div className="bg-white w-full max-w-md rounded-t-xl p-4 shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800 capitalize">{activePopup}</h4>
            <button
              onClick={() => setActivePopup(null)}
              className="text-gray-500 hover:text-gray-800"
            >
              <LucideX />
            </button>
          </div>

          {/* Filter Inputs */}
          {activePopup === 'category' && (
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {activePopup === 'experienceLevel' && (
            <select
              value={filters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Levels</option>
              <option value="Entry">Entry Level</option>
              <option value="Junior">Junior Level</option>
              <option value="Mid-Level">Mid Level</option>
              <option value="Senior">Senior</option>
            </select>
          )}

          {activePopup === 'location' && (
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          )}

          {activePopup === 'skills' && (
            <Input
              type="text"
              placeholder="e.g. React, Python..."
              value={filters.skills}
              onChange={(e) => handleFilterChange('skills', e.target.value)}
              className="w-full p-3"
            />
          )}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {/* Desktop / Tablet */}
      <div className="hidden md:block">
        <Card className="p-8 z-[10000] bg-white rounded-2xl shadow-lg">
          <CardContent>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Smart Filters</h3>
            <div className="space-y-6">
              {/* Category */}
              <div>
                <Label className="mb-2">Category</Label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <Label className="mb-2">Experience Level</Label>
                <select
                  value={filters.experienceLevel}
                  onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Levels</option>
                  <option value="Entry">Entry Level</option>
                  <option value="Junior">Junior Level</option>
                  <option value="Mid-Level">Mid Level</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <Label className="mb-2">Location</Label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills */}
              <div>
                <Label className="mb-2">Skills</Label>
                <Input
                  type="text"
                  placeholder="e.g. React, Python..."
                  value={filters.skills}
                  onChange={(e) => handleFilterChange('skills', e.target.value)}
                  className="p-3"
                />
              </div>

              {/* Min Score only for desktop */}
              {hasActiveFilters && (
                <div>
                  <Label className="mb-2">Min Score: {filters.minScore}%</Label>
                  <Slider
                    value={[filters.minScore]}
                    onValueChange={(val) => handleFilterChange('minScore', val[0])}
                    max={100}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-[999999] bg-white border-t border-gray-200 shadow-lg">
       

        <div className="flex justify-around p-3 space-x-2">
          {Object.keys(mobileIcons).map((filter) => (
            <button
              key={filter}
              className="flex flex-col items-center justify-center text-gray-600"
              onClick={() => togglePopup(filter)}
            >
              {mobileIcons[filter]}
              {filters[filter] && <span className="text-xs mt-1 text-blue-500">{filters[filter]}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Render mobile popup portal */}
      {renderMobilePopup()}
    </>
  );
};

export default FiltersPanel;
