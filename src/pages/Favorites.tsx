import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/EventCard";
import { useFavorites } from "@/context/FavoritesContext";
import { EVENTS } from "@/data/catalog";

export function Favorites() {
  const { favorites, clearFavorites } = useFavorites();
  const events = EVENTS.filter((event) => favorites.includes(event.id));

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8">
      <PageHeader
        eyebrow="Ma sélection"
        title="Favoris"
        description="Vos événements suivis, conservés localement sur cet appareil."
        actions={
          events.length > 0 ? (
            <button
              type="button"
              onClick={clearFavorites}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Trash2 className="h-4 w-4" /> Tout retirer
            </button>
          ) : undefined
        }
      />

      {events.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/5">
            <Heart className="h-7 w-7 text-white/40" />
          </span>
          <h2 className="font-display text-xl font-bold text-white">
            Aucun favori pour l'instant
          </h2>
          <p className="max-w-sm text-sm text-white/50">
            Touchez le cœur sur un événement pour le retrouver ici et recevoir vos rappels.
          </p>
          <Link
            to="/"
            className="mt-2 rounded-full bg-white px-6 py-3 font-display text-sm font-bold text-ink-950 transition-transform hover:scale-105"
          >
            Parcourir les événements
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
