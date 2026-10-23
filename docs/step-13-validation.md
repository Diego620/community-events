# Step 13 - Validation rules

## Checklist

- [x] Add `@NotBlank` to the `title` field in `Event` with a clear message
- [x] Add `@NotNull` and `@Future` to the `eventDate` field in `Event` with clear messages
- [x] Add `@Min(1)` to the `capacity` field in `Event` with a clear message
- [x] Add `@NotBlank` to the `organiserId` field in `Event`
- [x] Add `@Valid` to the `@RequestBody` parameter in the create endpoint
- [x] Add `@Valid` to the `@RequestBody` parameter in the update endpoint
- [x] Restart the backend and test the endpoints using Swagger
- [x] Confirm an empty or missing title returns `400 Bad Request`
- [x] Confirm a capacity of `0` returns `400 Bad Request`
- [x] Confirm a negative capacity returns `400 Bad Request`
- [x] Confirm a missing capacity returns `400 Bad Request`
- [x] Confirm a past date returns `400 Bad Request` when creating an event
- [x] Confirm a past date returns `400 Bad Request` when updating an event
- [x] Confirm a missing `organiserId` returns `400 Bad Request`
- [x] Confirm a valid event still returns `201 Created`

## Notes / gotchas
- None