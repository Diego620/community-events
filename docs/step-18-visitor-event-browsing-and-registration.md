# Step 18 - Visitor event browsing and registration

## Checklist

- [x] Create a `VisitorDashboard.tsx` component under `frontend/src/components`
- [x] Display published events using `getPublishedEvents()` from `eventService.ts`
- [x] Load events when the Visitor dashboard opens
- [x] Show each event's title, description, date/time, capacity, and other useful details
- [x] Display a loading message while events are being fetched
- [x] Display a helpful message if no published events exist
- [x] Display an error message if fetching events fails
- [x] Add a "Register Interest" button to each published event
- [x] Call `registerInterest(event.id)` when the button is clicked
- [x] Show a success message when registration succeeds
- [x] Show the backend's error message when registration fails
- [x] Prevent repeated clicks while a registration request is in progress
- [x] Render `VisitorDashboard` in `App.tsx` when the selected role is `visitor`
- [x] Test browsing published events as a Visitor
- [x] Test registering interest successfully
- [x] Test a rejected registration scenario supported by the backend
- [ ] Run the frontend and backend together and verify the flow

## Notes / gotchas
- None