import React from "react";

export interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  description?: string;
  variant?: "gradient" | "solid";
  color?:
    | "blue"
    | "green"
    | "orange"
    | "red"
    | "purple"
    | "indigo"
    | "amber"
    | "emerald"
    | "gray";
  icon?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  size?: "sm" | "md" | "lg";
}

const colorClasses = {
  gradient: {
    blue: "from-blue-500 to-purple-600",
    green: "from-green-500 to-emerald-600",
    orange: "from-orange-500 to-red-600",
  },
  solid: {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    gray: "bg-gray-50 text-gray-600",
  },
};

const sizeClasses = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function KPICard({
  title,
  value,
  subtitle,
  description,
  variant = "solid",
  color = "blue",
  icon,
  trend,
  size = "md",
}: KPICardProps) {
  const isGradient = variant === "gradient";
  const baseClasses = `rounded-lg shadow ${sizeClasses[size]}`;

  const cardClasses = isGradient
    ? `${baseClasses} bg-gradient-to-r ${
        colorClasses.gradient[color as keyof typeof colorClasses.gradient]
      } text-white`
    : `${baseClasses} ${colorClasses.solid[color]}`;

  const titleClasses = isGradient
    ? "text-lg font-semibold mb-2"
    : "text-sm font-medium text-gray-600 mb-1";

  const valueClasses = isGradient ? "text-3xl font-bold" : "text-2xl font-bold";

  const subtitleClasses = isGradient
    ? "text-sm opacity-90"
    : "text-xs text-gray-500";

  return (
    <div className={cardClasses}>
      {icon && (
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">{icon}</span>
          <h3 className={titleClasses}>{title}</h3>
        </div>
      )}
      {!icon && <h3 className={titleClasses}>{title}</h3>}

      <p className={valueClasses}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>

      {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
      {description && <p className={subtitleClasses}>{description}</p>}

      {trend && (
        <p
          className={`text-xs mt-1 ${
            trend.isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend.value}
        </p>
      )}
    </div>
  );
}

// 특별한 Tier Distribution 카드를 위한 컴포넌트
export interface TierCardProps {
  tier: "bronze" | "silver" | "gold";
  count: number;
}

export function TierCard({ tier, count }: TierCardProps) {
  const tierConfig = {
    bronze: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      label: "Bronze",
      labelColor: "text-amber-700",
    },
    silver: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: "Silver",
      labelColor: "text-gray-700",
    },
    gold: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Gold",
      labelColor: "text-yellow-700",
    },
  };

  const config = tierConfig[tier];

  return (
    <div className={`${config.bg} rounded-lg p-3 text-center`}>
      <p className={`text-lg font-bold ${config.text}`}>
        {count.toLocaleString()}
      </p>
      <p className={`text-xs ${config.labelColor}`}>{config.label}</p>
    </div>
  );
}

// Activity Item을 위한 컴포넌트
export interface ActivityItemProps {
  type: "payment" | "reward" | "membership" | "campaign";
  message: string;
  timestamp: string;
}

export function ActivityItem({ type, message, timestamp }: ActivityItemProps) {
  const typeConfig = {
    payment: { color: "bg-green-500", label: "Web3 payment" },
    reward: { color: "bg-blue-500", label: "Rewards distributed" },
    membership: { color: "bg-purple-500", label: "New member" },
    campaign: { color: "bg-orange-500", label: "Campaign launched" },
  };

  const config = typeConfig[type];

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <div className="flex items-center">
        <span className={`w-2 h-2 ${config.color} rounded-full mr-3`}></span>
        <span className="text-gray-700">{message}</span>
      </div>
      <span className="text-sm text-gray-500">{timestamp}</span>
    </div>
  );
}
