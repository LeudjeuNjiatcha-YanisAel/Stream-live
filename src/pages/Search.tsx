import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/EventCard";
import { EVENTS } from "@/data/catalog";
import { SPORT_META } from "@/lib/format";

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function Search() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => {
    const needle = normalize(initial.trim());
    if (!needle) return [];
    return EVENTS.filter((event) => {
      const haystack = normalize(
        [event.title, event.competition, SPORT_META[event.sport].label, ...event.tags].join(" "),
      );
      return haystack.includes(needle);
    });
  }, [initial]);

  const submit = (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();
    setParams(query.trim() ? { q: query.trim() } : {});
  };

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8">
      <PageHeader
        eyebrow="Recherche"
        title="Trouver un événement"
        description="Recherchez par équipe, compétition, discipline ou mot-clé."
      />

      <form onSubmit={submit} className="mt-6 flex items-center gap-3">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 focus-within:border-brand-400/60">
          <SearchIcon className="h-5 w-5 text-white/45" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex. derby, tennis, ligue élite…"
            className="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-2xl bg-white px-6 py-3.5 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-[1.03]"
        >
          Chercher
        </button>
      </form>

      {initial.trim() && (
        <p className="mt-6 text-sm text-white/50">
          {results.length} résultat{results.length > 1 ? "s" : ""} pour «&nbsp;{initial}&nbsp;»
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}
