import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/EventCard";
import { getReplayEvents } from "@/data/catalog";

export function Replays() {
  const replays = getReplayEvents();

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8">
      <PageHeader
        eyebrow="Vidéo à la demande"
        title="Rediffusions"
        description="Les intégrales et résumés des événements passés, disponibles quand vous voulez."
      />

      <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {replays.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}
