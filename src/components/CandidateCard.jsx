import { useHiring } from "../contexts/HiringContext";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CandidateCard = ({ candidate }) => {
  const {
    selectedTeam,
    shortlistedCandidates,
    handleSelectCandidate,
    handleShortlistCandidate,
    filters,
  } = useHiring();

  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const isSelected = selectedTeam.some((t) => t.id === candidate.id);
  const isShortlisted = shortlistedCandidates.includes(candidate.id);
  const teamFull = selectedTeam.length >= 5;

  const salaryFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(candidate.salaryExpectation);

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getCardBorderClass = () => {
    if (isSelected) return "border-green-500 bg-green-50";
    if (isShortlisted) return "border-yellow-500 bg-yellow-50";
    return "border-gray-200 hover:border-blue-300";
  };

  const filtersApplied = Object.values(filters).some((f) =>
    Array.isArray(f) ? f.length > 0 : !!f
  );

  return (
    <Card className={`flex flex-col transition-all ${getCardBorderClass()}`}>
      {/* Header */}
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {candidate.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {candidate.currentRole}
          </p>
          <p className="text-xs text-gray-500">{candidate.location}</p>
        </div>

        <div className="flex flex-col items-end">
          {filtersApplied && candidate.score !== undefined && (
            <Badge
              className={`${getScoreColor(
                candidate.score
              )} px-3 py-1 text-xs font-semibold`}
            >
              {candidate.score}% Match
            </Badge>
          )}
          <p className="text-xs text-gray-600 mt-1">{salaryFormatted}</p>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col flex-1 space-y-4">
        {/* Contact Info */}
        <div className="text-xs text-gray-600 space-y-2">
          {candidate.email && (
            <div className="relative">
              <span className="font-medium">Email: </span>
              <span
                onClick={() => handleCopy(candidate.email, "email")}
                className="underline cursor-pointer text-gray-800"
              >
                {candidate.email}
              </span>
              {copiedField === "email" && (
                <Badge className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white">
                  Copied!
                </Badge>
              )}
            </div>
          )}
          {candidate.phone && (
            <div className="relative">
              <span className="font-medium">Phone: </span>
              <span
                onClick={() => handleCopy(candidate.phone, "phone")}
                className="underline cursor-pointer text-gray-800"
              >
                {candidate.phone}
              </span>
              {copiedField === "phone" && (
                <Badge className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white">
                  Copied!
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Category:</span>
            <p className="text-gray-600">{candidate.category}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Experience:</span>
            <p className="text-gray-600">{candidate.experienceLevel}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Education:</span>
            <p className="text-gray-600">{candidate.education.highest_level}</p>
          </div>

          {/* Companies / Roles */}
          {candidate.work_experiences?.length > 0 && (
            <div className="relative group">
              <span className="font-medium text-gray-700">Companies:</span>
              <p className="text-gray-600 underline decoration-dotted cursor-pointer">
                {candidate.yearsExperience} roles
              </p>

              {/* Tooltip on hover */}
              <div className="absolute left-0 z-20 w-60 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg hidden group-hover:block">
                <ul className="space-y-1">
                  {candidate.work_experiences.map((exp, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{exp.roleName}</span> @{" "}
                      {exp.company}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Skills */}
        {candidate.skills.length > 0 && (
          <div>
            <span className="font-medium text-gray-700 text-sm">Skills:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {candidate.skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="rounded-full">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons pinned to bottom */}
        <div className="flex gap-2 mt-auto pt-4">
          {isSelected ? (
            <Button
              variant="destructive"
              onClick={() => handleSelectCandidate(candidate.id)}
              className="flex-1"
            >
              Remove from Team
            </Button>
          ) : (
            <Button
              onClick={() => handleSelectCandidate(candidate.id)}
              disabled={teamFull}
              className="flex-1"
            >
              {teamFull ? "Team Full" : "Add to Team"}
            </Button>
          )}
          <Button
            variant={isShortlisted ? "secondary" : "outline"}
            onClick={() => handleShortlistCandidate(candidate.id)}
          >
            {isShortlisted ? "Shortlisted" : "Shortlist"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
