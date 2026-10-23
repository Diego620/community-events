package com.diego.events.entity;

import com.diego.events.repository.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final EventRepository eventRepository;

    public DataSeeder(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public void run(String... args) {
        if (eventRepository.count() > 0) {
            return;
        }

        createEvent(
                "Beach Cleanup",
                "Help clean up our local beach.",
                30,
                EventStatus.PUBLISHED,
                "organiser-1"
        );

        createEvent(
                "Community Book Swap",
                "Bring a book and discover something new.",
                20,
                EventStatus.PENDING_REVIEW,
                "organiser-2"
        );

        createEvent(
                "Local Repair Café",
                "Bring household items that need fixing.",
                15,
                EventStatus.PENDING_REVIEW,
                "organiser-1"
        );
    }

    private void createEvent(
            String title,
            String description,
            int capacity,
            EventStatus status,
            String organiserId
    ) {
        Event event = new Event();
        event.setTitle(title);
        event.setDescription(description);
        event.setEventDate(LocalDateTime.now().plusDays(7));
        event.setCapacity(capacity);
        event.setStatus(status);
        event.setOrganiserId(organiserId);

        eventRepository.save(event);
    }
}