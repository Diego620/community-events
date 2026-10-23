# Step 19 - Organiser dashboard and event management

## Checklist

- [x] Create an `OrganiserDashboard.tsx` component under `frontend/src/components`
- [x] Pass the selected `organiserId` from `App.tsx` to `OrganiserDashboard`
- [x] Fetch and display events belonging to the selected organiser using `getEventsByOrganiser()`
- [x] Display each event's title, description, date/time, capacity, and status
- [x] Display a loading message while events are being fetched
- [x] Display a helpful message if the organiser has no events
- [x] Display an error message if fetching events fails
- [x] Add a form for creating events
- [x] Include fields for title, description, event date/time, and capacity
- [x] Validate required fields before submitting
- [x] Create events using `createEvent()`
- [x] Ensure newly created events start with `PENDING_REVIEW`
- [x] Refresh the organiser's event list after successful creation
- [x] Add an edit option for existing events
- [x] Populate the form with the selected event's existing details when editing
- [x] Save changes using `updateEvent()`
- [x] Display success and error messages for create and update operations
- [x] Prevent repeated form submissions while a request is in progress
- [x] Render `OrganiserDashboard` in `App.tsx` when the selected role is `organiser`
- [x] Pass the selected organiser ID to the dashboard
- [x] Test viewing events for both `organiser-1` and `organiser-2`
- [x] Test creating an event
- [x] Test editing an existing event
- [x] Verify newly created events are pending review and aren't visible to Visitors

## Notes / gotchas
- None