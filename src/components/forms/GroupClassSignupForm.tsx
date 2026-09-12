import { useRef, useState, type FormEvent } from "react";
import { GROUP_REGISTRATION_ENDPOINT } from "../../config";
import { classSchedule, formatSessionLabel } from "../../data/schedule";
import { Button } from "../ui/Button";
import { SelectField, TextareaField, TextField } from "../ui/FormField";
import { SuccessMessage } from "../ui/SuccessMessage";

const initialValues = { name: "", email: "", classId: "", notes: "" };

/**
 * Fire-and-forget: records the registration in the studio's Google Sheet
 * when an endpoint is configured. Apps Script Web Apps don't reply with
 * usable CORS headers, so the response can't be read from the browser —
 * this only confirms the request was sent, not that it succeeded, which
 * is why the on-page success message never depends on it.
 */
function recordRegistration(values: typeof initialValues) {
  if (!GROUP_REGISTRATION_ENDPOINT) {
    return;
  }
  const session = classSchedule.find((candidate) => candidate.id === values.classId);
  fetch(GROUP_REGISTRATION_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      className: session ? formatSessionLabel(session) : values.classId,
      notes: values.notes,
    }),
  }).catch(() => {
    // Nothing to do: there's no backend to report the failure to either.
  });
}

export function GroupClassSignupForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(false);

    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    recordRegistration(values);
    setIsSubmitted(true);
    setValues(initialValues);
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl2 border border-sand-300 bg-white p-8 shadow-soft sm:p-10">
      <form ref={formRef} noValidate onSubmit={handleSubmit}>
        <div className="grid gap-x-5 sm:grid-cols-2">
          <TextField
            id="rsvp-name"
            label="Full name"
            required
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          />
          <TextField
            id="rsvp-email"
            label="Email"
            type="email"
            required
            value={values.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          />
        </div>

        <SelectField
          id="rsvp-class"
          label="Choose a class"
          required
          value={values.classId}
          onChange={(event) => setValues((prev) => ({ ...prev, classId: event.target.value }))}
        >
          <option value="" disabled>
            Select a day and time
          </option>
          {classSchedule.map((session) => (
            <option key={session.id} value={session.id}>
              {formatSessionLabel(session)}
            </option>
          ))}
        </SelectField>

        <TextareaField
          id="rsvp-notes"
          label="Anything we should know (optional)"
          placeholder="First time practicing, an injury, a preference for the back of the room, anything at all."
          value={values.notes}
          onChange={(event) => setValues((prev) => ({ ...prev, notes: event.target.value }))}
        />

        <Button type="submit">Reserve my spot</Button>
      </form>

      {isSubmitted ? (
        <SuccessMessage>
          Thanks. Your spot is reserved. We look forward to practicing with you. (This is a first-version demo
          form; nothing is sent yet.)
        </SuccessMessage>
      ) : null}
    </div>
  );
}
