import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Heart,
  Radio,
  ShieldCheck,
  Signal,
} from "lucide-react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { EventCard } from "@/components/EventCard";
import { useFavorites } from "@/context/FavoritesContext";
import { EVENTS, getEventById } from "@/data/catalog";
import { formatDateTime, formatViewers, LICENSE_META, SPORT_META } from "@/lib/format";
import { cn } from "@/lib/cn";

export function Watch() {
  const { id } = useParams<{ id: string }>();
  const event = id ? getEventById(id) : undefined;
  const { isFavorite, toggleFavorite } = useFavorites();
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const related = useMemo(() => {
    if (!event) return [];
    return EVENTS.filter(
      (item) => item.id !== event.id && (item.sport === event.sport || item.competition === event.competition),
    ).slice(0, 6);
  }, [event]);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-3xl font-bold text-white">Événement introuvable</h1>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-brand-300 hover:text-brand-200"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  const source = event.sources[sourceIndex] ?? event.sources[0];
  const favorite = isFavorite(event.id);

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="mb-5 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </button>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <VideoPlayer
            source={source}
            isLive={event.status === "live"}
            title={event.title}
            poster={undefined}
          />

          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75">
                  {SPORT_META[event.sport].glyph} {SPORT_META[event.sport].label}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-300">
                  {event.competition}
                </span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                {event.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
                {event.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite(event.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all",
                favorite
                  ? "bg-accent-500 text-white"
                  : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
              )}
            >
              <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
              {favorite ? "Dans les favoris" : "Ajouter aux favoris"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-white/5 py-5 text-sm text-white/65">
            {event.status === "live" && event.score && (
              <span className="font-display text-lg font-bold text-white">
                {event.score.home} {event.score.homeScore} – {event.score.awayScore} {event.score.away}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-300" />
              {formatDateTime(event.startTime)}
            </span>
            {typeof event.viewers === "number" && (
              <span className="inline-flex items-center gap-2">
                <Radio className="h-4 w-4 text-accent-400" />
                {formatViewers(event.viewers)} spectateurs
              </span>
            )}
            {event.durationMin && (
              <span className="inline-flex items-center gap-2">
                <Signal className="h-4 w-4 text-brand-300" />
                {event.durationMin} min
              </span>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-white/5 bg-ink-850/60 p-5">
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-white">
              <Signal className="h-4 w-4 text-brand-400" />
              Sources disponibles
            </h2>
            <p className="mt-1 text-xs text-white/45">
              {event.sources.length} flux légaux / ouverts
            </p>
            <div className="mt-4 space-y-2.5">
              {event.sources.map((item, index) => {
                const license = LICENSE_META[item.license];
                const active = index === sourceIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSourceIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                      active
                        ? "border-brand-400/60 bg-brand-500/15"
                        : "border-white/5 bg-white/[0.03] hover:bg-white/[0.07]",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                        active ? "bg-brand-500 text-white" : "bg-white/5 text-white/60",
                      )}
                    >
                      {active ? <CheckCircle2 className="h-4 w-4" /> : <Signal className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-white">
                        {item.label}
                      </span>
                      <span className="block truncate text-xs text-white/45">
                        {item.provider} · {item.quality ?? "Auto"}
                      </span>
                    </span>
                    <span className={cn("text-[10px] font-medium", license.tone)}>
                      {license.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5">
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-emerald-200">
              <ShieldCheck className="h-4 w-4" />
              Diffusion responsable
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-emerald-100/70">
              Ce catalogue n'utilise que des flux ouverts ou de démonstration. Ajoutez vos
              propres sources autorisées dans <code className="text-emerald-200">src/data/catalog.ts</code>.
            </p>
          </section>

          {related.length > 0 && (
            <section>
              <h2 className="mb-3 font-display text-base font-bold text-white">
                À découvrir aussi
              </h2>
              <div className="space-y-3">
                {related.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <EventCard event={item} index={0} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
