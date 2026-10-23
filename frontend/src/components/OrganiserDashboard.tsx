import { useEffect, useState } from "react";
import {
    getEventsByOrganiser,
    createEvent,
    updateEvent,
} from "../services/eventService";
import type { Event } from "../types/event";

interface OrganiserDashboardProps {
    organiserId: string;
}

function OrganiserDashboard({ organiserId }: OrganiserDashboardProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [capacity, setCapacity] = useState("1");

    async function loadEvents() {
        setLoading(true);
        setError("");

        try {
            const organiserEvents = await getEventsByOrganiser(organiserId);
            setEvents(organiserEvents);
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
    }, [organiserId]);

    function resetForm() {
        setTitle("");
        setDescription("");
        setEventDate("");
        setCapacity("1");
        setEditingId(null);
    }

    function startEditing(event: Event) {
        setEditingId(event.id);
        setTitle(event.title);
        setDescription(event.description);
        setEventDate(event.eventDate.slice(0, 16));
        setCapacity(String(event.capacity));
        setMessage("");
        setError("");
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage("");
        setError("");

        const eventData = {
            title: title.trim(),
            description: description.trim(),
            eventDate,
            capacity: Number(capacity),
            organiserId,
        };

        if (
            !eventData.title ||
            !eventData.description ||
            !eventData.eventDate ||
            !Number.isInteger(eventData.capacity) ||
            eventData.capacity < 1
        ) {
            setError("Complete every field and enter a valid capacity.");
            return;
        }

        setSaving(true);

        try {
            if (editingId !== null) {
                await updateEvent(editingId, eventData);
                setMessage("Event updated successfully!");
            } else {
                await createEvent(eventData);
                setMessage("Event created! It is awaiting admin approval.");
            }

            resetForm();
            await loadEvents();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to save event."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <main>
            <h1>Organiser Dashboard</h1>
            <p>Organiser: {organiserId}</p>

            <h2>{editingId !== null ? "Edit Event" : "Create Event"}</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Event title</label>
                    <input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="eventDate">Date and time</label>
                    <input
                        id="eventDate"
                        type="datetime-local"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="capacity">Capacity</label>
                    <input
                        id="capacity"
                        type="number"
                        min="1"
                        step="1"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={saving}>
                    {saving
                        ? "Saving..."
                        : editingId !== null
                            ? "Save Changes"
                            : "Create Event"}
                </button>

                {editingId !== null && (
                    <button
                        type="button"
                        onClick={resetForm}
                        disabled={saving}
                    >
                        Cancel Edit
                    </button>
                )}
            </form>

            {message && <p>{message}</p>}
            {error && <p role="alert">Error: {error}</p>}

            <h2>Your Events</h2>

            {loading ? (
                <p>Loading your events...</p>
            ) : events.length === 0 ? (
                <p>You haven't created any events yet.</p>
            ) : (
                events.map((event) => (
                    <article key={event.id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>Date: {event.eventDate}</p>
                        <p>Capacity: {event.capacity}</p>
                        <p>Status: {event.status}</p>

                        <button
                            type="button"
                            onClick={() => startEditing(event)}
                        >
                            Edit Event
                        </button>
                    </article>
                ))
            )}
        </main>
    );
}

export default OrganiserDashboard;