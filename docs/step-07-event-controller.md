# Step 07 - Event controller

## Checklist
- [x] Create a new package `controller` under `backend/src/main/java/com/diego/events`
- [x] Create the `EventController` Java class inside `controller`
- [x] Add the `@RestController` annotation
- [x] Add the `@RequestMapping("/api/events")` annotation to define the base URL
- [x] Inject `EventService` using constructor injection
- [x] Create a `GET` endpoint to retrieve all events using `@GetMapping`
- [x] Create a `GET` endpoint to retrieve one event by ID using `@GetMapping("/{id}")`
- [x] Return `404 Not Found` when an event ID doesn't exist
- [x] Restart the backend and confirm it starts successfully
- [x] Test both endpoints using a browser or API client

## Notes / gotchas
- @PathVariable extracts a value from the URL and passes it into the endpoint method as a parameter, such as an event ID.
- @GetMapping maps GET requests to a specific URL to the controller method responsible for handling them.