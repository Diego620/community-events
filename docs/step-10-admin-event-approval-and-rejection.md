# Step 10 - Admin event approval and rejection

## Checklist

- [x] Add a method to `EventService` to publish an event
- [x] Add a method to `EventService` to reject an event
- [x] Check that the event exists before changing its status
- [x] Set the event status to `PUBLISHED` when approved
- [x] Set the event status to `REJECTED` when rejected
- [x] Save the updated event using `eventRepository.save(event)`
- [x] Add a `PATCH /api/events/{id}/publish` endpoint
- [x] Add a `PATCH /api/events/{id}/reject` endpoint
- [x] Return `404 Not Found` if the event doesn't exist
- [x] Return the updated event with `200 OK` when successful
- [x] Restart the backend and test both endpoints using Swagger
- [x] Confirm the event status changes correctly in the API response

## Notes / gotchas
- We use @PatchMapping because we're only updating part of an existing event, specifically its status, rather than replacing the entire resource.
- @PathVariable extracts a value from the URL path and assigns it to a Java method parameter, such as the event ID.