import React from "react";
import { Card, CardContent } from "@/components/ui/card";
const StatsCard = ({ title, value, color }) => {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4 flex flex-col items-center">
        <span className="text-gray-500">{title}</span>
        <span
          className={`text-2xl font-bold mt-2 ${color} text-white px-4 py-2 rounded-lg`}
        >
          {value}
        </span>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
