package com.diego.events.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatusException(ResponseStatusException exception) {
        String reason = exception.getReason();
        String code = switch (reason == null ? "" : reason) {
            case "EVENT_NOT_FOUND" -> "EVENT_NOT_FOUND";
            case "EVENT_NOT_PUBLISHED" -> "EVENT_NOT_PUBLISHED";
            case "EVENT_FULL" -> "EVENT_FULL";
            default -> "REQUEST_ERROR";
        };
        String message = switch (code) {
            case "EVENT_NOT_FOUND" -> "The requested event was not found.";
            case "EVENT_NOT_PUBLISHED" -> "Registration is not available until the event is published.";
            case "EVENT_FULL" -> "Registration is no longer available because this event is full.";
            default -> reason == null ? "The request could not be completed." : reason;
        };
        return ResponseEntity.status(exception.getStatusCode())
                .body(new ErrorResponse(code, message));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return ResponseEntity.badRequest()
                .body(new ErrorResponse("VALIDATION_ERROR", message));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpectedException(Exception exception) {
        logger.error("Unexpected server error while handling request.", exception);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("INTERNAL_SERVER_ERROR", "An unexpected server error occurred."));
    }
}