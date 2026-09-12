import { GroupClassSignupForm } from "../components/forms/GroupClassSignupForm";
import { PrivateSessionForm } from "../components/forms/PrivateSessionForm";
import { Container } from "../components/ui/Container";
import { ScheduleTable } from "../components/ui/ScheduleTable";
import { Section } from "../components/ui/Section";
import { SectionHeading } from "../components/ui/SectionHeading";
import { classSchedule } from "../data/schedule";

export function ClassesPage() {
  return (
    <>
      <Section className="pb-10 text-center">
        <Container>
          <span className="mb-4 inline-block font-body text-xs font-medium uppercase tracking-widest text-primary-700">
            Classes
          </span>
          <h1 className="text-4xl sm:text-5xl">This week at the studio</h1>
          <p className="mx-auto mt-4 max-w-[56ch] text-sand-700">
            Same instructors, same times, week after week, so the practice can become a habit rather than an
            errand.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <ScheduleTable sessions={classSchedule} />
          <p className="mt-6 text-center italic text-sand-600">
            The studio is closed on Sundays. Even a small room needs a day of stillness.
          </p>
        </Container>
      </Section>

      <Section tone="alt" id="reserve">
        <Container>
          <SectionHeading
            eyebrow="Reserve your spot"
            title="Sign up for a group class"
            description="Pick a class from the schedule above and let us know you're coming. We'll hold your spot at the front desk."
          />
          <GroupClassSignupForm />
        </Container>
      </Section>

      <Section id="private-sessions">
        <Container>
          <SectionHeading
            eyebrow="Prefer one-to-one time?"
            title="Private Sessions"
            description="Instead of a group class, you can register for a private session built around you: recovering from an injury, preparing for something specific, or just wanting more attention than a group class allows."
          />
          <PrivateSessionForm />
        </Container>
      </Section>
    </>
  );
}
