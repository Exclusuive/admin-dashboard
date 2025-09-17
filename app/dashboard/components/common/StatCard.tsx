import React from "react";

// 통계 카드를 위한 컴포넌트 (Orders, Memberships 등에서 사용)
export interface StatCardProps {
  title: string;
  value: string | number;
  color?: "default" | "blue" | "green" | "red" | "purple" | "orange" | "indigo";
  subtitle?: string;
  icon?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  color = "default",
  subtitle,
  icon,
}: StatCardProps) {
  const colorClasses = {
    default: "text-gray-900",
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    indigo: "text-indigo-600",
  };

  const valueColorClass = colorClasses[color];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className={`text-2xl font-bold ${valueColorClass}`}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="ml-4 flex-shrink-0">{icon}</div>}
      </div>
    </div>
  );
}
