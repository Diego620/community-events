package com.diego.events.service;

import com.diego.events.entity.Event;
import com.diego.events.entity.EventStatus;
import com.diego.events.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        event.setId(null);
        event.setStatus(EventStatus.PENDING_REVIEW);
        return eventRepository.save(event);
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

        return Optional.of(eventRepository.save(event));
    }

    public Optional<Event> publishEvent(Long id) {
        Optional<Event> existingEvent = eventRepository.findById(id);

        if (existingEvent.isEmpty()) {
            return Optional.empty();
        }

        Event event = existingEvent.get();
        event.setStatus(EventStatus.PUBLISHED);

        return Optional.of(eventRepository.save(event));
    }

    public Optional<Event> rejectEvent(Long id) {
        Optional<Event> existingEvent = eventRepository.findById(id);

        if (existingEvent.isEmpty()) {
            return Optional.empty();
        }

        Event event = existingEvent.get();
        event.setStatus(EventStatus.REJECTED);

        return Optional.of(eventRepository.save(event));
    }
}