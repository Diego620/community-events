package com.diego.events.service;

import com.diego.events.entity.Event;
import com.diego.events.entity.EventStatus;
import com.diego.events.entity.Registration;
import com.diego.events.repository.EventRepository;
import com.diego.events.repository.RegistrationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class RegistrationService {

    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;

    public RegistrationService(
            EventRepository eventRepository,
            RegistrationRepository registrationRepository) {
        this.eventRepository = eventRepository;
        this.registrationRepository = registrationRepository;
    }

    public Registration registerInterest(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Event not found"));

        if (event.getStatus() != EventStatus.PUBLISHED) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot register for an unpublished event");
        }

        long registrationCount =
                registrationRepository.countByEventId(eventId);

        if (registrationCount >= event.getCapacity()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Event has reached its registration capacity");
        }

        Registration registration = new Registration();
        registration.setEventId(eventId);
        registration.setRegisteredAt(LocalDateTime.now());

        return registrationRepository.save(registration);
    }
}