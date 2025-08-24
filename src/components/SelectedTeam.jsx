import { useHiring } from "../contexts/HiringContext";
import TeamMemberCard from "./TeamMemberCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SelectedTeam = () => {
  const { selectedTeam, diversityScore } = useHiring();

  if (selectedTeam.length === 0) return null;

  return (
    <Card className="mb-8 bg-white shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          🎯 Your Selected Team <Badge variant="secondary">{selectedTeam.length}/5</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedTeam.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </CardContent>

      {selectedTeam.length === 5 && (
        <CardContent className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            🎉 Congratulations! You've assembled your dream team of 5 candidates with a {diversityScore}% diversity score.
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default SelectedTeam;
