import { cn } from "@/lib/cn";

export function LiveBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-accent-500/30",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white/80" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      Direct
    </span>
  );
}
