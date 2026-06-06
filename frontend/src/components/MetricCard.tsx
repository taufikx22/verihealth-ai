interface MetricCardProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  value: string | number;
  label: string;
  trend?: {
    value: string;
    direction: "up" | "down";
    positive?: boolean; // whether the trend direction is good
  };
  badge?: {
    text: string;
    color: string;
  };
}

export default function MetricCard({
  icon,
  iconBg,
  iconColor,
  value,
  label,
  trend,
  badge,
}: MetricCardProps) {
  const trendColor = trend
    ? trend.positive !== false
      ? trend.direction === "up"
        ? "text-green-500 bg-green-500/10"
        : "text-red-500 bg-red-500/10"
      : trend.direction === "down"
        ? "text-green-500 bg-green-500/10"
        : "text-red-500 bg-red-500/10"
    : "";

  return (
    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow" id={`metric-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 ${iconBg} ${iconColor} rounded-lg`}>
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-bold ${trendColor} px-2 py-1 rounded-full`}>
            <span className="material-symbols-outlined text-[14px]">
              {trend.direction === "up" ? "arrow_upward" : "arrow_downward"}
            </span>
            {trend.value}
          </span>
        )}
        {badge && (
          <span className={`px-2 py-0.5 rounded-full ${badge.color} text-[10px] font-bold`}>
            {badge.text}
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">{value}</p>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}
