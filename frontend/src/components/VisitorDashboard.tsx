import { useEffect, useState } from "react";
import {getPublishedEvents, registerInterest,} from "../services/eventService";
import type { Event } from "../types/event";

function VisitorDashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [registeringId, setRegisteringId] = useState<number | null>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadEvents() {
            try {
                const publishedEvents = await getPublishedEvents();
                setEvents(publishedEvents);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load events."
                );
            } finally {
                setLoading(false);
            }
        }

        loadEvents();
    }, []);

    async function handleRegister(eventId: number) {
        setRegisteringId(eventId);
        setMessage("");

        try {
            await registerInterest(eventId);
            setMessage("Successfully registered your interest!");
        } catch (err) {
            setMessage(
                err instanceof Error
                    ? err.message
                    : "Registration failed."
            );
        } finally {
            setRegisteringId(null);
        }
    }

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <main>
            <h1>Browse Events</h1>

            {message && <p>{message}</p>}

            {events.length === 0 ? (
                <p>No published events available.</p>
            ) : (
                events.map((event) => (
                    <article key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <p>Date: {event.eventDate}</p>
                        <p>Capacity: {event.capacity}</p>
                        <p>Status: {event.status}</p>

                        <button
                            onClick={() => handleRegister(event.id)}
                            disabled={registeringId === event.id}
                        >
                            {registeringId === event.id
                                ? "Registering..."
                                : "Register Interest"}
                        </button>
                    </article>
                ))
            )}
        </main>
    );
}

export default VisitorDashboard;