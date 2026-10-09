import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EventItem } from "@/types";
import { EventCard } from "@/components/EventCard";

interface RailProps {
  title: string;
  subtitle?: string;
  events: EventItem[];
  moreHref?: string;
  fixedWidth?: boolean;
}

export function Rail({ title, subtitle, events, moreHref, fixedWidth = true }: RailProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    scroller.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  if (events.length === 0) return null;

  return (
    <section className="relative py-6">
      <div className="mb-4 flex items-end justify-between gap-4 px-1">
        <div>
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-white/45">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {moreHref && (
            <Link
              to={moreHref}
              className="mr-1 hidden text-sm font-medium text-brand-300 transition-colors hover:text-brand-200 sm:block"
            >
              Tout voir
            </Link>
          )}
          {fixedWidth && (
            <>
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Précédent"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Suivant"
              >
                <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {fixedWidth ? (
        <div
          ref={scroller}
          className="scrollbar-none -mx-1 flex gap-4 overflow-x-auto px-1 pb-2"
        >
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} width="fixed" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
