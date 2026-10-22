# Step 06 - Event service

## Checklist
- [x] Create a new package `service` under `backend/src/main/java/com/diego/events`
- [x] Create the `EventService` Java class inside `service`
- [x] Inject `EventRepository` into `EventService` using constructor injection
- [x] Create a method to retrieve all events using `eventRepository.findAll()`
- [x] Create a method to retrieve one event by ID using `eventRepository.findById(id)`
- [x] Understand that the service layer sits between the controller and repository
- [x] Keep business logic in the service rather than putting it directly in the controller
- [x] Restart the backend
- [x] Confirm the backend starts successfully

## Notes / gotchas
- The @Service annotation registers the class as a Spring-managed component, allowing Spring's dependency injection system to automatically supply it wherever it's needed, such as in a controller.
- The "Optional" class represents a value that may or may not be present, allowing you to detect when a value is missing and decide how to handle it.