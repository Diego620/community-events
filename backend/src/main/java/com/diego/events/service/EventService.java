package com.diego.events.service;

import com.diego.events.entity.Event;
import com.diego.events.entity.EventStatus;
import com.diego.events.repository.EventRepository;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private static final Logger logger = LoggerFactory.getLogger(EventService.class);
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getPublishedEvents() {
        return eventRepository.findByStatus(EventStatus.PUBLISHED);
    }

    public List<Event> getEventsByOrganiser(String organiserId) {
        return eventRepository.findByOrganiserId(organiserId);
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        event.setId(null);
        event.setStatus(EventStatus.PENDING_REVIEW);
        Event savedEvent = eventRepository.save(event);
        logger.info("Event {} was created.", savedEvent.getId());
        return savedEvent;
    }

    public Optional<Event> updateEvent(Long id, Event updatedEvent) {
        Optional<Event> existingEvent =
                eventRepository.findByIdAndOrganiserId(
                        id, updatedEvent.getOrganiserId());

        if (existingEvent.isEmpty()) {
            return Optional.empty();
        }

        Event event = existingEvent.get();
        event.setTitle(updatedEvent.getTitle());
        event.setDescription(updatedEvent.getDescription());
        event.setEventDate(updatedEvent.getEventDate());
        event.setCapacity(updatedEvent.getCapacity());

        Event savedEvent = eventRepository.save(event);
        logger.info("Event {} was updated.", savedEvent.getId());
        return Optional.of(savedEvent);
    }

    public Optional<Event> publishEvent(Long id) {
        Optional<Event> existingEvent = eventRepository.findById(id);

        if (existingEvent.isEmpty()) {
            return Optional.empty();
        }

        Event event = existingEvent.get();
        event.setStatus(EventStatus.PUBLISHED);

        Event savedEvent = eventRepository.save(event);
        logger.info("Event {} was published.", savedEvent.getId());
        return Optional.of(savedEvent);
    }

    public Optional<Event> rejectEvent(Long id) {
        Optional<Event> existingEvent = eventRepository.findById(id);

        if (existingEvent.isEmpty()) {
            return Optional.empty();
        }

        Event event = existingEvent.get();
        event.setStatus(EventStatus.REJECTED);

        Event savedEvent = eventRepository.save(event);
        logger.info("Event {} was rejected.", savedEvent.getId());
        return Optional.of(savedEvent);
    }
}