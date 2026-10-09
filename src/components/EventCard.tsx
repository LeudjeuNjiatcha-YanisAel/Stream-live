import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Play, Radio, Clock } from "lucide-react";
import type { EventItem } from "@/types";
import { useFavorites } from "@/context/FavoritesContext";
import { formatViewers, relativeLabel, SPORT_META } from "@/lib/format";
import { Poster } from "@/components/Poster";
import { LiveBadge } from "@/components/LiveBadge";
import { cn } from "@/lib/cn";

interface EventCardProps {
  event: EventItem;
  index?: number;
  width?: "fluid" | "fixed";
}

export function EventCard({ event, index = 0, width = "fluid" }: EventCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(event.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative",
        width === "fixed" ? "w-[280px] shrink-0 sm:w-[320px]" : "w-full",
      )}
    >
      <Link to={`/watch/${event.id}`} className="block focus:outline-none">
        <div className="relative overflow-hidden rounded-2xl border border-white/5 ring-1 ring-white/5 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-white/15 group-hover:shadow-2xl group-hover:shadow-black/60">
          <Poster event={event} className="aspect-video w-full" />

          <div className="absolute left-3 top-3 flex items-center gap-2">
            {event.status === "live" && <LiveBadge />}
            {event.status === "upcoming" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                <Clock className="h-3 w-3" />
                {relativeLabel(event.startTime)}
              </span>
            )}
            {event.status === "replay" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                <Play className="h-3 w-3" />
                Rediff
              </span>
            )}
          </div>

          <button
            type="button"
            aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            onClick={(clickEvent) => {
              clickEvent.preventDefault();
              clickEvent.stopPropagation();
              toggleFavorite(event.id);
            }}
            className={cn(
              "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-all",
              favorite
                ? "bg-accent-500 text-white"
                : "bg-black/45 text-white/85 hover:bg-black/70 hover:text-white",
            )}
          >
            <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
          </button>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
              {SPORT_META[event.sport].label}
            </span>
            {typeof event.viewers === "number" && event.status === "live" && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/80">
                <Radio className="h-3 w-3" />
                {formatViewers(event.viewers)}
              </span>
            )}
          </div>

          <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/30">
              <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-3 px-0.5">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-xs font-medium uppercase tracking-wider text-white/45">
            {event.competition}
          </p>
          {event.score && (
            <span className="shrink-0 font-display text-sm font-bold tabular-nums text-white">
              {event.score.homeScore}–{event.score.awayScore}
            </span>
          )}
        </div>
        <h3 className="mt-1 truncate font-display text-base font-semibold text-white/95 group-hover:text-white">
          {event.title}
        </h3>
      </div>
    </motion.article>
  );
}
