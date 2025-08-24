import FiltersPanel from './FiltersPanel';
import CandidatesSection from './CandidatesSection';
import ActionButtons from './ActionButtons';

const MainContent = () => {
  return (
    <div className="relative">
      {/* Desktop / Tablet Layout */}
      <div className="hidden lg:grid grid-cols-4 gap-8 mb-8">
        {/* Left Panel: Filters + Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-6">
            <FiltersPanel />
            <ActionButtons />
          </div>
        </div>

        {/* Right Panel: Candidates */}
        <div className="lg:col-span-3 space-y-6">
          <CandidatesSection />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
         <ActionButtons />
        {/* Candidates Section */}
        <div className="space-y-6 mb-[160px]">
          {/* Extra bottom margin so content is not hidden behind sticky panel */}
          <CandidatesSection />

        </div>

        {/* Sticky Bottom Filters + Actions */}
        <div className="fixed bottom-0 left-0 right-0 z-[10000] bg-white border-t border-gray-200 shadow-inner p-4 flex flex-col space-y-4">
          {/* Add padding top/bottom */}
          <h3 className="text-sm font-semibold text-gray-800 text-center mt-2">
            Smart Filters - Choose your filter
          </h3>
           
           
          
          <div className="mt-2 p-3">
            <FiltersPanel />
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default MainContent;
