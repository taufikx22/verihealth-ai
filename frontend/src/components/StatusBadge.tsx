interface StatusBadgeProps {
  status: "Pending" | "Verified" | "Flagged" | "Enriched" | "Rejected" | "Processing" | "Completed" | "Failed";
}

const statusConfig: Record<string, { bg: string; text: string; border: string; icon?: string }> = {
  Verified: {
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-100 dark:border-green-800",
    icon: "check_circle",
  },
  Completed: {
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-100 dark:border-green-800",
    icon: "check_circle",
  },
  Flagged: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-100 dark:border-orange-800",
    icon: "flag",
  },
  Enriched: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-800",
    icon: "auto_fix_high",
  },
  Processing: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-800",
    icon: "progress_activity",
  },
  Rejected: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-100 dark:border-red-800",
    icon: "cancel",
  },
  Pending: {
    bg: "bg-slate-50 dark:bg-slate-800/50",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-200 dark:border-slate-700",
    icon: "schedule",
  },
  Failed: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-100 dark:border-red-800",
    icon: "error",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 ${config.bg} ${config.text} text-xs font-bold rounded-lg border ${config.border}`}
    >
      {config.icon && (
        <span className="material-symbols-outlined text-[14px]">{config.icon}</span>
      )}
      {status}
    </span>
  );
}
