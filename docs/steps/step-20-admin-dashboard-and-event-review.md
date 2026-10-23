# Step 20 - Admin Dashboard and Event Review

## Checklist

- [x] Create an `AdminDashboard.tsx` component under `../../frontend/src/components`
- [x] Fetch and display all events using `getAllEvents()`
- [x] Display each event's title, description, date/time, capacity, organiser ID, and status
- [x] Display a loading message while events are being fetched
- [x] Display a helpful message if no events exist
- [x] Display an error message if fetching events fails
- [x] Add a Publish button for events awaiting review
- [x] Add a Reject button for events awaiting review
- [x] Publish events using `publishEvent()`
- [x] Reject events using `rejectEvent()`
- [x] Refresh the event list after publishing or rejecting an event
- [x] Display success and error messages for admin actions
- [x] Prevent repeated submissions while an action is in progress
- [x] Ensure Publish and Reject buttons are only available for `PENDING_REVIEW` events
- [x] Render `AdminDashboard` in `App.tsx` when the selected role is `admin`
- [x] Test publishing a pending event
- [x] Verify published events appear in the Visitor dashboard
- [x] Test rejecting a pending event
- [x] Verify rejected events do not appear in the Visitor dashboard
- [x] Verify the event status updates correctly after each action

## Notes / gotchas
- None