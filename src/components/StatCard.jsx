import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const iconMap = {
  blue: "text-blue-500",
  yellow: "text-yellow-500",
  green: "text-green-500",
  purple: "text-purple-500",
  red: "text-red-500",
};

const StatCard = ({ title, value, icon, color = "blue" }) => {
  const textColor = iconMap[color] || iconMap.blue;

  return (
    <Card className="hover:scale-105 transition-transform duration-300 shadow-md border border-gray-100 rounded-2xl bg-gradient-to-br from-white to-gray-50 animate-fade-in-up">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <CardTitle className="text-gray-600 text-sm font-medium">{title}</CardTitle>
          <CardDescription className={`text-2xl font-bold mt-1 ${textColor}`}>{value}</CardDescription>
        </div>
        <div className={`text-3xl flex-shrink-0 ${textColor}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
