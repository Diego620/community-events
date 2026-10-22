package com.diego.events.repository;

import com.diego.events.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    long countByEventId(Long eventId);
}