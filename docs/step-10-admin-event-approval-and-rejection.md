# Step 10 - Admin event approval and rejection

## Checklist

- [ ] Add a method to `EventService` to publish an event
- [ ] Add a method to `EventService` to reject an event
- [ ] Check that the event exists before changing its status
- [ ] Set the event status to `PUBLISHED` when approved
- [ ] Set the event status to `REJECTED` when rejected
- [ ] Save the updated event using `eventRepository.save(event)`
- [ ] Add a `PATCH /api/events/{id}/publish` endpoint
- [ ] Add a `PATCH /api/events/{id}/reject` endpoint
- [ ] Return `404 Not Found` if the event doesn't exist
- [ ] Return the updated event with `200 OK` when successful
- [ ] Restart the backend and test both endpoints using Swagger
- [ ] Confirm the event status changes correctly in the API response

## Notes / gotchas
- We use @PatchMapping because we're only updating part of an existing event, specifically its status, rather than replacing the entire resource.
- @PathVariable extracts a value from the URL path and assigns it to a Java method parameter, such as the event ID.