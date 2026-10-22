package com.diego.events.repository;

import com.diego.events.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByIdAndOrganiserId(Long id, String organiserId);
}