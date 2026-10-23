# Step 12 - Published and organiser event endpoints

## Checklist

- [x] Add a method to `EventRepository` to find events by status
- [x] Add a method to `EventRepository` to find events by organiser ID
- [x] Add a method to `EventService` to get all published events
- [x] Add a method to `EventService` to get events for a specific organiser
- [x] Add a `GET /api/events/published` endpoint
- [x] Update `GET /api/events` to accept an optional `organiserId` using `@RequestParam`
- [x] Return only that organiser's events when `organiserId` is provided
- [x] Return all events when `organiserId` is not provided
- [x] Return `200 OK` with the list of events
- [x] Restart the backend and test the endpoints using Swagger
- [x] Confirm a new pending event does not appear in `/published`
- [x] Confirm the event appears in `/published` after publishing it
- [x] Confirm `GET /api/events?organiserId=organiser-1` only returns that organiser's events

## Notes / gotchas
- @RequestParam(required = false) tells Spring to look for an optional query parameter in the URL when fetching events. If organiserId is provided, filter events by that organiser. If it's missing, Spring sets it to null, allowing the code to skip the if statement and return all events instead.