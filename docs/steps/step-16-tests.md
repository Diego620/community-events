# Step 16 - Automated tests

## Checklist

- [x] Create `RegistrationServiceTest` in `src/test/java/com/diego/events/service`
- [x] Use Mockito to mock `EventRepository` and `RegistrationRepository` (no database needed)
- [x] Test 1: registering on an unpublished event is rejected
- [x] Assert it throws a `ResponseStatusException` with status `409`
- [x] Verify that `registrationRepository.save()` was never called
- [x] Test 2: registering on a full event is rejected
- [x] Set the mocked registration count equal to the event's capacity
- [x] Assert it throws a `ResponseStatusException` with status `409`
- [x] Test 3: registering on a published event with space succeeds
- [x] Assert the saved registration has the right event ID and a timestamp
- [x] Optional: add `EventServiceTest` to check that publishing sets the status to `PUBLISHED`
- [x] Run the tests using the green arrow next to the class in IntelliJ
- [x] Run them from the terminal in `backend` with `./mvnw test`
- [x] Confirm all tests pass
- [x] Break one rule on purpose, confirm the matching test fails, then undo it

## Notes / gotchas
- 1L represents the number 1 as a primitive long, which Java can automatically box into a Long object when needed.
- When naming test methods, consistently follow the "ExpectedResult_Condition_Method" convention to make each test's purpose clear.