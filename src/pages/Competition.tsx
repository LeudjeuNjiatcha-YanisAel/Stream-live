import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { COMPETITIONS, EVENTS } from "@/data/catalog";

export function Competition() {
  const { id } = useParams<{ id: string }>();
  const competition = COMPETITIONS.find((item) => item.id === id);

  if (!competition) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-3xl font-bold text-white">Compétition introuvable</h1>
        <Link
          to="/competitions"
          className="mt-6 inline-flex items-center gap-2 text-brand-300 hover:text-brand-200"
        >
          <ArrowLeft className="h-4 w-4" /> Retour aux compétitions
        </Link>
      </div>
    );
  }

  const events = EVENTS.filter((event) => event.competition === competition.name);

  return (
    <div>
      <div
        className="relative overflow-hidden border-b border-white/5"
        style={{ backgroundImage: `linear-gradient(120deg, ${competition.accent}40, #05060c 75%)` }}
      >
        <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8">
          <Link
            to="/competitions"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Compétitions
          </Link>
          <div className="mt-6 flex items-center gap-5">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-3xl backdrop-blur">
              {competition.glyph}
            </span>
            <div>
              <h1 className="font-display text-3xl font-extrabold text-white sm:text-5xl">
                {competition.name}
              </h1>
              <p className="mt-1 text-sm text-white/60">
                {events.length} événement{events.length > 1 ? "s" : ""} au catalogue
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
