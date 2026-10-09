import type { EventItem } from "@/types";
import { cn } from "@/lib/cn";

interface PosterProps {
  event: EventItem;
  className?: string;
  glyphClassName?: string;
  showGlyph?: boolean;
}

export function Poster({ event, className, glyphClassName, showGlyph = true }: PosterProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage: `linear-gradient(140deg, ${event.poster.from} 0%, ${event.poster.to} 78%)`,
      }}
    >
      <div
        className="absolute -right-10 -top-14 h-44 w-44 rounded-full opacity-40 blur-2xl"
        style={{ background: event.poster.from }}
      />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {showGlyph && (
        <span
          className={cn(
            "absolute bottom-3 right-4 text-5xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110",
            glyphClassName,
          )}
        >
          {event.poster.glyph}
        </span>
      )}
    </div>
  );
}
