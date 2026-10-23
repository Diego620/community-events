# Step 17 - Frontend foundation

## Checklist

- [x] Add `"PATCH"` to `allowedMethods` in `CorsConfig` and restart the backend
- [x] Delete the Vite starter leftovers: `hero.png`, `react.svg` and `vite.svg`
- [x] Empty the contents of `App.css` and `index.css` (don't delete the files, `main.tsx` imports `index.css`)
- [x] Create `components`, `services` and `types` folders under `../../frontend/src`
- [x] Create a TypeScript type for `Event` matching the backend fields
- [x] Create types for the event status and the role (visitor, organiser, admin)
- [x] Create an `eventService` file in `services` with one function per endpoint:
  - [x] Get published events
  - [x] Get all events (admin)
  - [x] Get events by organiser ID
  - [x] Create event
  - [x] Update event
  - [x] Publish event
  - [x] Reject event
  - [x] Register interest
- [x] Keep the backend base URL in one place
- [x] Make every service function go through one shared helper that throws the backend's `message` on an error response, with a fallback message if the body isn't JSON
- [x] Keep the selected role and organiser ID in state in `App.tsx` (no router, no separate pages)
- [x] Build a role selection screen with three cards and a Continue button
- [x] Show an organiser dropdown (`organiser-1`, `organiser-2`) when Event Organiser is selected
- [x] Build a shared top bar with the role name and a "Switch role" link
- [x] Render a placeholder heading for each role after Continue
- [x] Make "Switch role" clear the state and return to the selection screen
- [x] Remove the health check fetch from `App.tsx` (keep the endpoint in the backend)
- [x] Run `npm run dev` and check each role opens its placeholder and "Switch role" goes back

## Notes / gotchas

- Use `Omit<Event, "id" | "status">` in the service functions because the backend generates the ID and manages the event status.
- Keep role and organiser selection state in `App.tsx`, but put the role-selection UI in a reusable component under `components/`. No router or separate page architecture is needed.
- The service functions are written, but verify the organiser-specific and registration endpoint URLs against the actual backend controllers before relying on them.
