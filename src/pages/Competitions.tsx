import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { COMPETITIONS, EVENTS } from "@/data/catalog";
import { SPORT_META } from "@/lib/format";

export function Competitions() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8">
      <PageHeader
        eyebrow="Catégories"
        title="Compétitions"
        description="Parcourez le catalogue par ligue et par discipline."
      />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COMPETITIONS.map((competition, index) => {
          const count = EVENTS.filter((event) => event.competition === competition.name).length;
          return (
            <motion.div
              key={competition.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <Link
                to={`/competitions/${competition.id}`}
                className="group relative flex h-44 flex-col justify-between overflow-hidden rounded-2xl border border-white/5 p-6 transition-all hover:-translate-y-1 hover:border-white/15"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${competition.accent}33, #0e1120 70%)`,
                }}
              >
                <div
                  className="absolute -right-6 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                  style={{ background: competition.accent }}
                />
                <span className="relative text-4xl">{competition.glyph}</span>
                <div className="relative">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                    {SPORT_META[competition.sport].label}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">
                    {competition.name}
                  </h3>
                  <p className="mt-1 text-xs text-white/50">
                    {count} événement{count > 1 ? "s" : ""}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
