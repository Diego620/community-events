import { useEffect, useState } from "react";
import {getAllEvents, publishEvent, rejectEvent,} from "../services/eventService";
import type { Event } from "../types/event";

function AdminDashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function loadEvents() {
        setLoading(true);
        setError("");

        try {
            const allEvents = await getAllEvents();
            setEvents(allEvents);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load events."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEvents();
    }, []);

    async function handleReview(eventId: number, action: "publish" | "reject") {
        setProcessingId(eventId);
        setError("");
        setMessage("");

        try {
            if (action === "publish") {
                await publishEvent(eventId);
                setMessage("Event published successfully!");
            } else {
                await rejectEvent(eventId);
                setMessage("Event rejected.");
            }

            await loadEvents();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to update event."
            );
        } finally {
            setProcessingId(null);
        }
    }

    return (
        <main>
            <h1>Admin Dashboard</h1>
            <p>Review and manage community events.</p>

            {message && <p>{message}</p>}
            {error && <p role="alert">Error: {error}</p>}

            <h2>All Events</h2>

            {loading ? (
                <p>Loading events...</p>
            ) : events.length === 0 ? (
                <p>No events have been created yet.</p>
            ) : (
                events.map((event) => (
                    <article key={event.id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>Date: {event.eventDate}</p>
                        <p>Capacity: {event.capacity}</p>
                        <p>Organiser: {event.organiserId}</p>
                        <p>Status: {event.status}</p>

                        {event.status === "PENDING_REVIEW" && (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleReview(event.id, "publish")
                                    }
                                    disabled={processingId !== null}
                                >
                                    {processingId === event.id
                                        ? "Processing..."
                                        : "Publish"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleReview(event.id, "reject")
                                    }
                                    disabled={processingId !== null}
                                >
                                    {processingId === event.id
                                        ? "Processing..."
                                        : "Reject"}
                                </button>
                            </>
                        )}
                    </article>
                ))
            )}
        </main>
    );
}

export default AdminDashboard;