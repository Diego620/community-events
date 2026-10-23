package com.diego.events.service;

import com.diego.events.entity.Event;
import com.diego.events.entity.EventStatus;
import com.diego.events.entity.Registration;
import com.diego.events.repository.EventRepository;
import com.diego.events.repository.RegistrationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RegistrationServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private RegistrationRepository registrationRepository;

    @InjectMocks
    private RegistrationService registrationService;

    @Test
    void rejectsRegistrationForUnpublishedEvent() {
        Event event = event(EventStatus.PENDING_REVIEW, 2);
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> registrationService.registerInterest(1L));

        assertEquals(409, exception.getStatusCode().value());
        verify(registrationRepository, never()).save(any());
    }

    @Test
    void rejectsRegistrationWhenEventIsFull() {
        Event event = event(EventStatus.PUBLISHED, 2);
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));
        when(registrationRepository.countByEventId(1L)).thenReturn(2L);

        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> registrationService.registerInterest(1L));

        assertEquals(409, exception.getStatusCode().value());
        verify(registrationRepository, never()).save(any());
    }

    @Test
    void registersPublishedEventWithAvailableCapacity() {
        Event event = event(EventStatus.PUBLISHED, 2);
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));
        when(registrationRepository.countByEventId(1L)).thenReturn(1L);
        when(registrationRepository.save(any(Registration.class)))
                .thenAnswer(invocation -> {
                    Registration registration = invocation.getArgument(0);
                    registration.setId(7L);
                    return registration;
                });

        Registration result = registrationService.registerInterest(1L);

        ArgumentCaptor<Registration> captor = ArgumentCaptor.forClass(Registration.class);
        verify(registrationRepository).save(captor.capture());
        assertEquals(1L, captor.getValue().getEventId());
        assertNotNull(captor.getValue().getRegisteredAt());
        assertEquals(7L, result.getId());
    }

    private Event event(EventStatus status, int capacity) {
        Event event = new Event();
        event.setStatus(status);
        event.setCapacity(capacity);
        return event;
    }
}