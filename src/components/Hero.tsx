import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Play, Radio, Star } from "lucide-react";
import type { EventItem } from "@/types";
import { LiveBadge } from "@/components/LiveBadge";
import { formatDateTime, formatViewers, SPORT_META } from "@/lib/format";
import { cn } from "@/lib/cn";

export function Hero({ events }: { events: EventItem[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (events.length <= 1) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % events.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [events.length]);

  if (events.length === 0) return null;
  const event = events[active];

  return (
    <section className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={event.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(120deg, ${event.poster.from} 0%, ${event.poster.to} 70%), radial-gradient(circle at 80% 20%, ${event.poster.from}, transparent 55%)`,
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/40 to-transparent" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 pb-20 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {event.status === "live" && <LiveBadge />}
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
                {SPORT_META[event.sport].glyph} {SPORT_META[event.sport].label}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-300">
                {event.competition}
              </span>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl">
              {event.title}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              {event.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              {event.status === "live" && event.score && (
                <span className="font-display text-base font-bold text-white">
                  {event.score.home} {event.score.homeScore} – {event.score.awayScore}{" "}
                  {event.score.away}
                </span>
              )}
              {(event.status === "upcoming" || event.status === "replay") && (
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-brand-300" />
                  {formatDateTime(event.startTime)}
                </span>
              )}
              {typeof event.viewers === "number" && event.status === "live" && (
                <span className="inline-flex items-center gap-2">
                  <Radio className="h-4 w-4 text-accent-400" />
                  {formatViewers(event.viewers)} spectateurs
                </span>
              )}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to={`/watch/${event.id}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-[1.03] active:scale-95"
              >
                <Play className="h-4.5 w-4.5 fill-ink-950" />
                {event.status === "live" ? "Regarder en direct" : "Lancer le flux"}
              </Link>
              <Link
                to="/favorites"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-display text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                <Star className="h-4.5 w-4.5" />
                Ajouter aux favoris
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center gap-2.5">
          {events.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Afficher ${item.title}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                index === active ? "w-10 bg-white" : "w-4 bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
