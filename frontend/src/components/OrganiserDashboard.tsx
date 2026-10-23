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
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Organiser workspace</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Plan and manage events</h1>
                <p className="mt-3 text-base leading-7 text-slate-600">Create new activities and keep your event details up to date.</p>
                <p className="mt-3 inline-flex rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-xs font-semibold text-slate-600">{organiserId}</p>
            </div>

            <div className="mt-9 grid items-start gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
                    <h2 className="text-lg font-bold tracking-tight text-slate-950">{editingId !== null ? "Edit event" : "Create event"}</h2>
                    <p className="mt-1 text-sm text-slate-500">Submit an event for administrator review.</p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div>
                            <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">Event title</label>
                    <input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                            className="h-11 w-full rounded-xl border border-slate-300 px-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                        </div>
                        <div>
                    <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                            className="min-h-28 w-full resize-y rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                    <label htmlFor="eventDate" className="mb-2 block text-sm font-semibold text-slate-700">Date and time</label>
                    <input
                        id="eventDate"
                        type="datetime-local"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                            className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                        </div>
                        <div>
                    <label htmlFor="capacity" className="mb-2 block text-sm font-semibold text-slate-700">Capacity</label>
                    <input
                        id="capacity"
                        type="number"
                        min="1"
                        step="1"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                            className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                        </div>
                        </div>
                <button type="submit" disabled={saving} className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
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
                        className="ml-2 min-h-11 rounded-xl px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                    >
                        Cancel Edit
                    </button>
                )}
                    </form>
                    {message && <p role="status" className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p>}
                    {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">Error: {error}</p>}
                </section>

                <section>
            <h2 className="text-lg font-bold tracking-tight text-slate-950">Your events</h2>
            <p className="mt-1 text-sm text-slate-500">Manage your submitted events.</p>

            {loading ? (
                <p className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading your events...</p>
            ) : events.length === 0 ? (
                <p className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">You haven't created any events yet.</p>
            ) : (
                events.map((event) => (
                    <article key={event.id} className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h3 className="font-bold text-slate-950">{event.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{event.description}</p>
                                <p className="mt-3 text-sm text-slate-500">📅 {new Date(event.eventDate).toLocaleString()} · Capacity {event.capacity}</p>
                                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-blue-600">{event.status.replace("_", " ")}</p>
                            </div>

                        <button
                            type="button"
                            onClick={() => startEditing(event)}
                            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >Edit Event</button>
                        </div>
                    </article>
                ))
            )}
                </section>
            </div>
        </main>
    );
}

export default OrganiserDashboard;