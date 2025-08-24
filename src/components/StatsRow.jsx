import { useHiring } from "../contexts/HiringContext";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideUsers, LucideStar, LucideCheckCircle, LucideSparkles } from "lucide-react";

const iconMap = {
  blue: <LucideUsers className="w-6 h-6 text-blue-500" />,
  yellow: <LucideStar className="w-6 h-6 text-yellow-500" />,
  green: <LucideCheckCircle className="w-6 h-6 text-green-500" />,
  purple: <LucideSparkles className="w-6 h-6 text-purple-500" />,
};

const StatsRow = () => {
  const { candidates, shortlistedCandidates, selectedTeam, diversityScore } = useHiring();

  const stats = [
    { title: "Total Applicants", value: candidates.length, color: "blue" },
    { title: "Shortlisted", value: shortlistedCandidates.length, color: "yellow" },
    { title: "Selected Team", value: `${selectedTeam.length}/5`, color: "green" },
    { title: "Diversity Score", value: `${diversityScore}%`, color: "purple" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="hover:scale-105 transition-transform duration-300 shadow-md border border-gray-100 rounded-2xl bg-gradient-to-br from-white to-gray-50"
        >
          <CardContent className="flex items-center space-x-4 p-5">
            <div className="flex-shrink-0 p-4 bg-gray-100 rounded-full flex items-center justify-center shadow-inner">
              {iconMap[stat.color]}
            </div>
            <div className="flex flex-col">
              <CardTitle className="text-lg font-semibold text-gray-800">{stat.title}</CardTitle>
              <CardDescription className="text-2xl font-bold text-gray-900">{stat.value}</CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsRow;
