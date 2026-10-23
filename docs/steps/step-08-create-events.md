# Step 08 - Create events

## Checklist
- [x] Add a method to `EventService` to create an event
- [x] Set the event status to `PENDING_REVIEW` when creating an event
- [x] Save the new event using `eventRepository.save(event)`
- [x] Add a `POST` endpoint in `EventController` using `@PostMapping`
- [x] Accept the event details from the request body using `@RequestBody`
- [x] Return `201 Created` when an event is successfully created
- [x] Restart the backend and confirm it starts successfully
- [x] Test creating an event using an API client
- [x] Confirm the created event appears in `GET /api/events`

## Notes / gotchas
- @PostMapping maps POST requests to a specific URL to the controller method responsible for handling them.