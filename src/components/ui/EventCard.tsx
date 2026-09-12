import { Link } from "react-router-dom";
import type { StudioEvent } from "../../data/types";

export function EventCard({ event }: { event: StudioEvent }) {
  return (
    <Link
      to={`/events/${event.slug}`}
      className="group flex flex-col rounded-xl2 border border-sand-300 bg-white p-7 shadow-soft transition-transform hover:-translate-y-1"
    >
      <span className="text-xs font-medium uppercase tracking-widest text-primary-700">{event.dateLabel}</span>
      <h3 className="mt-2 text-xl">{event.title}</h3>
      <p className="mt-2 flex-1 text-sand-700">{event.summary}</p>
      <div className="mt-5 flex items-center justify-between border-t border-sand-200 pt-4 text-sm">
        <span className="text-sand-600">From {event.priceFrom}</span>
        <span className="font-medium text-primary-700 group-hover:text-secondary-700">
          See details <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
