[# Step 14 - Activity logging

## Checklist

- [x] Add an SLF4J `Logger` to `EventService`
- [x] Add an SLF4J `Logger` to `RegistrationService`
- [x] Log when an event is created, including the event ID
- [x] Log when an event is updated, including the event ID
- [x] Log when an event is published, e.g. "Event 1 was published."
- [x] Log when an event is rejected, including the event ID
- [x] Log when a registration is created, including the event ID and registration ID
- [x] Log a warning when a registration is rejected because the event doesn't exist
- [x] Log a warning when a registration is rejected because the event isn't published
- [x] Log a warning when a registration is rejected because the event is full
- [x] Make sure no personal data is logged anywhere
- [x] Restart the backend and run a full flow in Swagger (create, publish, register until full)
- [x] Confirm each step shows up in the IntelliJ console with the event ID and outcome

## Notes / gotchas
- SLF4J is similar to ILogger in .NET, providing a standard interface for logging application events.