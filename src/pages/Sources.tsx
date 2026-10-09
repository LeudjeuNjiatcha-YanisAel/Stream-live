import { motion } from "framer-motion";
import { BookOpen, Scale, ShieldCheck, Upload } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EVENTS } from "@/data/catalog";
import { LICENSE_META } from "@/lib/format";
import type { License } from "@/types";

const CODE = `const MA_SOURCE = {
  id: "source-officielle-1",
  label: "Flux principal",
  kind: "hls",              // "hls" | "mp4" | "iframe"
  url: "https://exemple.com/live/master.m3u8",
  provider: "Mon fournisseur",
  quality: "1080p",
  language: "FR",
  license: "official",      // vous confirmez détenir les droits
};

const MON_EVENEMENT = {
  id: "mon-match",
  title: "Mon match",
  competition: "Ma compétition",
  sport: "football",
  status: "live",
  startTime: new Date().toISOString(),
  poster: { from: "#6d5efc", to: "#1b1f4b", glyph: "⚽" },
  accent: "#6d5efc",
  description: "Description de l'événement.",
  tags: ["Live"],
  sources: [MA_SOURCE],
};`;

export function Sources() {
  const licenseCounts = EVENTS.flatMap((event) => event.sources).reduce(
    (acc, source) => {
      acc[source.license] = (acc[source.license] ?? 0) + 1;
      return acc;
    },
    {} as Record<License, number>,
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <PageHeader
        eyebrow="Transparence"
        title="Sources & licences"
        description="StreamLive est un lecteur premium pensé pour ne diffuser que du contenu que vous êtes autorisé à distribuer."
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <InfoCard icon={<Scale className="h-5 w-5" />} title="100% légal">
          Aucun flux sportif sous droits n'est inclus. Le catalogue par défaut utilise des
          vidéos ouvertes de démonstration.
        </InfoCard>
        <InfoCard icon={<ShieldCheck className="h-5 w-5" />} title="Vos sources">
          Branchez vos flux autorisés (droits possédés, API partenaire, flux officiel public).
        </InfoCard>
        <InfoCard icon={<Upload className="h-5 w-5" />} title="Extensible">
          HLS, MP4 et iframe. Le modèle de données s'adapte à votre backend.
        </InfoCard>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-white">Licences utilisées</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {Object.entries(licenseCounts).map(([license, count]) => (
            <span
              key={license}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
            >
              <span className={LICENSE_META[license as License].tone}>
                {LICENSE_META[license as License].label}
              </span>
              <span className="text-white/45">× {count}</span>
            </span>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 rounded-3xl border border-white/10 bg-ink-850/60 p-6 sm:p-8"
      >
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white">
          <BookOpen className="h-5 w-5 text-brand-400" />
          Ajouter une source légale
        </h2>
        <p className="mt-2 text-sm text-white/55">
          Ouvrez <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">src/data/catalog.ts</code>{" "}
          et ajoutez votre source au tableau <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">sources</code>.
        </p>
        <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-ink-950 p-5 text-xs leading-relaxed text-white/80">
          <code>{CODE}</code>
        </pre>
      </motion.section>

      <section className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold text-amber-200">Rappel important</h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-100/75">
          La redistribution de flux sportifs sans autorisation est illégale dans la plupart des
          juridictions. Vous êtes responsable des sources que vous connectez. Privilégiez les
          diffuseurs officiels, les APIs de ligues, les flux YouTube/Twitch officiels et les
          contenus libres de droits.
        </p>
      </section>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-ink-850/60 p-5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
        {icon}
      </span>
      <h3 className="mt-3 font-display text-base font-bold text-white">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-white/50">{children}</p>
    </div>
  );
}
