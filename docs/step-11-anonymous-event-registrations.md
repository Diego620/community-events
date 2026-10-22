# Step 11 - Anonymous event registrations

## Checklist

- [x] Create a `Registration` entity for the `registrations` database table
- [x] Include an ID, event ID and registration timestamp
- [x] Ensure registrations don't require visitor names, emails or accounts
- [x] Create a `RegistrationRepository` using `JpaRepository`
- [x] Add a repository method to count registrations for a specific event
- [x] Create a `RegistrationService` to handle registration logic
- [x] Check that the requested event exists before registering interest
- [x] Only allow registrations for events with `PUBLISHED` status
- [x] Check that the event has available capacity before registering
- [x] Save the registration when all checks pass
- [x] Create a registration endpoint using `@PostMapping`
- [x] Return `201 Created` when registration succeeds
- [x] Return `404 Not Found` if the event doesn't exist
- [x] Return `409 Conflict` if the event isn't published or has reached capacity
- [x] Restart the backend and test registrations using Swagger
- [x] Confirm registrations persist in the SQLite database
- [x] Test that unpublished and full events reject registrations

## Notes / gotchas
- None