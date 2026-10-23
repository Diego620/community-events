package com.diego.events.service;

import com.diego.events.entity.Event;
import com.diego.events.entity.EventStatus;
import com.diego.events.entity.Registration;
import com.diego.events.repository.EventRepository;
import com.diego.events.repository.RegistrationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;

@Service
public class RegistrationService {

    private static final Logger logger = LoggerFactory.getLogger(RegistrationService.class);
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
                .orElseThrow(() -> {
                    logger.warn("Registration rejected for event {}: event not found.", eventId);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "EVENT_NOT_FOUND");
                });

        if (event.getStatus() != EventStatus.PUBLISHED) {
            logger.warn("Registration rejected for event {}: event is not published.", eventId);
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "EVENT_NOT_PUBLISHED");
        }

        long registrationCount =
                registrationRepository.countByEventId(eventId);

        if (registrationCount >= event.getCapacity()) {
            logger.warn("Registration rejected for event {}: event is full.", eventId);
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "EVENT_FULL");
        }

        Registration registration = new Registration();
        registration.setEventId(eventId);
        registration.setRegisteredAt(LocalDateTime.now());

        Registration savedRegistration = registrationRepository.save(registration);
        logger.info("Registration {} was created for event {}.", savedRegistration.getId(), eventId);
        return savedRegistration;
    }
}