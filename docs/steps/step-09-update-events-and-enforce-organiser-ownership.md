# Step 09 - Update events and enforce organiser ownership

## Checklist
- [x] Add a method to `EventRepository` to find events by ID and organiser ID
- [x] Add a method to `EventService` to update an existing event
- [x] Check that the event exists before updating it
- [x] Verify that the organiser owns the event before allowing updates
- [x] Prevent organisers from changing the event status directly
- [x] Add a `PUT` endpoint using `@PutMapping("/{id}")`
- [x] Accept the updated event details using `@RequestBody`
- [x] Return `404 Not Found` if the event doesn't exist or isn't owned by that organiser
- [x] Return the updated event with `200 OK` when successful
- [x] Restart the backend and test the endpoint using Swagger

## Notes / gotchas
- Added a custom repository method, findByIdAndOrganiserId(), to search for events matching both the event ID and organiser ID, since the built-in findById() only searches by event ID.