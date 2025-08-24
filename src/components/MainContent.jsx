import FiltersPanel from './FiltersPanel';
import CandidatesSection from './CandidatesSection';
import ActionButtons from './ActionButtons';

const MainContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
      
      {/* Left Panel: Filters + Actions */}
      <div className="lg:col-span-1 space-y-6">
        <div className="sticky top-6">
          <FiltersPanel />
          <ActionButtons />
        </div>
      </div>

      {/* Right Panel: Candidates */}
      <div className="lg:col-span-3">
        <div className="space-y-6">
          <CandidatesSection />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
