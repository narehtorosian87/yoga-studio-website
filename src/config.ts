/**
 * Endpoint the group class sign-up form posts registrations to (a Google
 * Apps Script Web App bound to the studio's registration spreadsheet —
 * see README.md for how to deploy one). Empty until configured, in which
 * case the form just shows its local confirmation without recording
 * anything, exactly like every other demo form on this site.
 */
export const GROUP_REGISTRATION_ENDPOINT = import.meta.env.VITE_GROUP_REGISTRATION_ENDPOINT ?? "";
