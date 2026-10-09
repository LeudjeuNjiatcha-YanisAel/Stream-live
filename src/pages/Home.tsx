import { motion } from "framer-motion";
import { ArrowRight, Flame, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Rail } from "@/components/Rail";
import {
  COMPETITIONS,
  getFeatured,
  getLiveEvents,
  getReplayEvents,
  getUpcomingEvents,
} from "@/data/catalog";

export function Home() {
  const featured = getFeatured();
  const live = getLiveEvents();
  const upcoming = getUpcomingEvents();
  const replays = getReplayEvents();

  return (
    <div>
      <Hero events={featured.length > 0 ? featured : live} />

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Rail
          title="En direct maintenant"
          subtitle="Les affiches à ne pas manquer, mises à jour en temps réel."
          events={live}
          moreHref="/live"
        />

        <section className="py-6">
          <div className="mb-4 flex items-center gap-2 px-1">
            <Trophy className="h-5 w-5 text-brand-400" />
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Compétitions
            </h2>
          </div>
          <div className="scrollbar-none -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
            {COMPETITIONS.map((competition, index) => (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <Link
                  to={`/competitions/${competition.id}`}
                  className="group flex w-44 shrink-0 flex-col gap-3 rounded-2xl border border-white/5 bg-ink-850/60 p-4 transition-all hover:-translate-y-1 hover:border-white/15"
                >
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl text-xl"
                    style={{ background: `${competition.accent}22` }}
                  >
                    {competition.glyph}
                  </span>
                  <span className="font-display text-sm font-semibold text-white/90 transition-colors group-hover:text-white">
                    {competition.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <Rail
          title="À venir"
          subtitle="Programmez vos soirées sport."
          events={upcoming}
          moreHref="/live"
        />

        <Rail
          title="Rediffusions"
          subtitle="Revivez les plus grands moments."
          events={replays}
          moreHref="/replays"
        />

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="my-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-600/30 via-ink-850 to-accent-500/20 p-8 sm:p-12"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
                <Flame className="h-3.5 w-3.5 text-accent-400" />
                Premium
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Une expérience de diffusion nouvelle génération
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Multi-caméras, reprises instantanées, statistiques en direct et rappels
                intelligents. Le tout dans une interface fluide, pensée pour le sport.
              </p>
            </div>
            <Link
              to="/competitions"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-105"
            >
              Explorer les compétitions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
