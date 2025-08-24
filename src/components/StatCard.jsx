import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const iconMap = {
  blue: "text-blue-500",
  yellow: "text-yellow-500",
  green: "text-green-500",
  purple: "text-purple-500",
  red: "text-red-500",
};

const StatCard = ({ title, value, icon, color = "blue", compact = false }) => {
  const textColor = iconMap[color] || iconMap.blue;

  return (
    <Card
      className={`hover:scale-105 transition-transform duration-300 shadow-md border border-gray-100 rounded-2xl bg-gradient-to-br from-white to-gray-50 animate-fade-in-up
        ${compact ? "w-20 p-3" : "p-5"}`} // smaller width & padding if compact
    >
      <CardContent
        className={`flex items-center justify-between ${compact ? "flex-col space-y-1 p-1" : "p-5"}`}
      >
        {!compact && title && (
          <div>
            <CardTitle className="text-gray-600 text-sm font-medium">{title}</CardTitle>
            <CardDescription className={`text-2xl font-bold mt-1 ${textColor}`}>{value}</CardDescription>
          </div>
        )}
        {compact && (
          <CardDescription className={`text-lg font-bold ${textColor}`}>{value}</CardDescription>
        )}
        <div className={`${compact ? "text-xl mt-1" : "text-3xl"} ${textColor} flex-shrink-0`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
