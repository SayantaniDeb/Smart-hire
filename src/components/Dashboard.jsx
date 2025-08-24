import Header from './Header';
import StatsRow from './StatsRow';
import MainContent from './MainContent';
import SelectedTeam from './SelectedTeam';
import Analytics from './Analytics';
import ActionButtons from './ActionButtons';
import TeamInsights from './TeamInsights';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800">
      {/* Full-width sticky header */}
      <Header />

      {/* Main container for the content */}
      <div className="container mx-auto px-4 py-10 space-y-10">
        <StatsRow />
        <MainContent />
        <SelectedTeam />
        <Analytics />
        <TeamInsights />
      </div>

      {/* Optional subtle overlay for depth */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent to-white opacity-30" />
    </div>
  );
};

export default Dashboard;
