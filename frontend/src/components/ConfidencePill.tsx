interface ConfidencePillProps {
  score: number;
  showLabel?: boolean;
}

export default function ConfidencePill({ score, showLabel = true }: ConfidencePillProps) {
  let bg: string;
  let text: string;
  let icon: string;

  if (score >= 80) {
    bg = "bg-green-500/20";
    text = "text-green-500";
    icon = "verified";
  } else if (score >= 50) {
    bg = "bg-orange-500/20";
    text = "text-orange-500";
    icon = "warning";
  } else {
    bg = "bg-red-500/20";
    text = "text-red-500";
    icon = "error";
  }

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${bg} ${text} flex items-center gap-1`}>
      <span className="material-symbols-outlined text-xs">{icon}</span>
      {showLabel && `${Math.round(score)}% CONFIDENCE`}
      {!showLabel && `${Math.round(score)}%`}
    </span>
  );
}
