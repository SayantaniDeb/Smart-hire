import StatCard from "./StatCard";
import { LucideUsers, LucideStar, LucideCheckCircle, LucideSparkles } from "lucide-react";
import { useHiring } from "../contexts/HiringContext";

const StatsRow = () => {
  const { candidates, shortlistedCandidates, selectedTeam, diversityScore } = useHiring();

  const stats = [
    { title: "Total Applicants", value: candidates.length, icon: <LucideUsers />, color: "blue" },
    { title: "Shortlisted", value: shortlistedCandidates.length, icon: <LucideStar />, color: "yellow" },
    { title: "Selected Team", value: `${selectedTeam.length}/5`, icon: <LucideCheckCircle />, color: "green" },
    { title: "Diversity Score", value: `${diversityScore}%`, icon: <LucideSparkles />, color: "purple" },
  ];

  return (
    <div className="mb-8">
      {/* Mobile view: compact horizontal row */}
      <div className="flex justify-between md:hidden">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            compact
          />
        ))}
      </div>

      {/* Desktop view: normal cards */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsRow;
