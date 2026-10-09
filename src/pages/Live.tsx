import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/EventCard";
import { getLiveEvents, getUpcomingEvents } from "@/data/catalog";
import { SPORT_META } from "@/lib/format";
import type { Sport } from "@/types";
import { cn } from "@/lib/cn";

type Filter = Sport | "all";

export function Live() {
  const [filter, setFilter] = useState<Filter>("all");
  const events = useMemo(() => [...getLiveEvents(), ...getUpcomingEvents()], []);

  const sports = useMemo(
    () => Array.from(new Set(events.map((event) => event.sport))),
    [events],
  );

  const filtered = filter === "all" ? events : events.filter((event) => event.sport === filter);

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8">
      <PageHeader
        eyebrow="Diffusion"
        title="En direct & à venir"
        description="Tous les événements en cours et les prochaines affiches, classés par heure de début."
      />

      <div className="scrollbar-none mt-6 flex gap-2 overflow-x-auto pb-1">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          Tous les sports
        </FilterChip>
        {sports.map((sport) => (
          <FilterChip key={sport} active={filter === sport} onClick={() => setFilter(sport)}>
            {SPORT_META[sport].glyph} {SPORT_META[sport].label}
          </FilterChip>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-transparent bg-white text-ink-950"
          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}
