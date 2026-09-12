import { Navigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { studioEvents } from "../data/events";

export function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const event = studioEvents.find((candidate) => candidate.slug === slug);

  if (!event) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Section className="pb-8 text-center">
        <Container className="max-w-2xl">
          <span className="mb-4 inline-block font-body text-xs font-medium uppercase tracking-widest text-primary-700">
            {event.dateLabel}
          </span>
          <h1 className="text-4xl sm:text-5xl">{event.title}</h1>
          <p className="mt-4 text-sand-700">{event.description}</p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl">Agenda</h2>
            <ul className="mt-4 space-y-3">
              {event.agenda.map((item) => (
                <li key={item.time} className="flex gap-4 border-b border-sand-200 pb-3">
                  <span className="w-40 shrink-0 font-medium text-primary-700">{item.time}</span>
                  <span className="text-sand-700">{item.activity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl2 border border-sand-300 bg-white p-7 shadow-soft">
            <p className="font-heading text-3xl text-sand-900">
              {event.priceFrom} <span className="font-body text-base text-sand-600">per person</span>
            </p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-sand-600">Location</dt>
                <dd className="text-right text-sand-900">{event.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-sand-600">Led by</dt>
                <dd className="text-right text-sand-900">{event.instructor}</dd>
              </div>
            </dl>

            <h3 className="mt-6 text-sm font-medium uppercase tracking-wide text-sand-600">What's included</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-sand-700">
              {event.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <Button
              href={`mailto:hello@ekamyoga.studio?subject=${encodeURIComponent(`${event.title} — I'd like to join`)}`}
              className="mt-6 w-full justify-center"
            >
              Email us to reserve a spot
            </Button>
            <p className="mt-3 text-center text-xs text-sand-600">
              Spots are limited. Email us and we'll hold you a place while payment details are confirmed.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
