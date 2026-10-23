# Step 15 - Readable error messages

## Checklist

- [x] Create an `exception` package under `com.diego.events`
- [x] Create an `ErrorResponse` record with two fields: `code` and `message`
- [x] Create a `GlobalExceptionHandler` class and mark it with `@RestControllerAdvice`
- [x] Add a handler for `ResponseStatusException` that returns its status with an `ErrorResponse`
- [x] Give registration failures their own codes: `EVENT_NOT_FOUND`, `EVENT_NOT_PUBLISHED`, `EVENT_FULL`
- [x] Add a handler for validation errors (`MethodArgumentNotValidException`) that returns `400` with code `VALIDATION_ERROR` and the field messages
- [x] Add a handler for unexpected exceptions that logs the full error on the server and returns `500` with a generic message
- [x] Make sure no stack traces, database details or file paths appear in any response
- [x] Restart the backend and test the endpoints using Swagger
- [x] Confirm registering on a full event returns `409` with code `EVENT_FULL`
- [x] Confirm registering on an unpublished event returns `409` with code `EVENT_NOT_PUBLISHED`
- [x] Confirm registering on an unknown event returns `404` with code `EVENT_NOT_FOUND`
- [x] Confirm creating an event with capacity `0` returns `400` with code `VALIDATION_ERROR`

## Notes / gotchas
- @RestControllerAdvice tells Spring that the class can handle exceptions thrown by controllers across the application.
- The ErrorResponse record automatically provides a constructor and built-in methods, allowing GlobalExceptionHandler to create structured API error responses without writing boilerplate code.