package com.diego.events.controller;

import com.diego.events.entity.Registration;
import com.diego.events.service.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events/{eventId}/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(
            RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<Registration> registerInterest(
            @PathVariable Long eventId) {

        Registration registration =
                registrationService.registerInterest(eventId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(registration);
    }
}