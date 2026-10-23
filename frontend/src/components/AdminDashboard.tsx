import { useEffect, useState } from "react";
import {getAllEvents, publishEvent, rejectEvent,} from "../services/eventService";
import type { Event } from "../types/event";

function AdminDashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const pendingEvents = events.filter((event) => event.status === "PENDING_REVIEW");

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
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Administration</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Event review</h1>
                    <p className="mt-3 text-base leading-7 text-slate-600">Review submissions and decide what appears in the community calendar.</p>
                </div>
                <span className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                    {pendingEvents.length} awaiting review
                </span>
            </div>

            {message && <p role="status" className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p>}
            {error && <p role="alert" className="mt-7 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">Error: {error}</p>}

            <h2 className="mt-10 text-lg font-bold tracking-tight text-slate-950">All events</h2>

            {loading ? (
                <p className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500">Loading events...</p>
            ) : events.length === 0 ? (
                <p className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">No events have been created yet.</p>
            ) : (
                events.map((event) => (
                    <article key={event.id} className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-lg font-bold text-slate-950">{event.title}</h3>
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                                        event.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" :
                                            event.status === "REJECTED" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"
                                    }`}>{event.status.replace("_", " ")}</span>
                                </div>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{event.description}</p>
                                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                                    <span>📅 {new Date(event.eventDate).toLocaleString()}</span>
                                    <span>Capacity: {event.capacity}</span>
                                    <span className="font-mono text-xs">{event.organiserId}</span>
                                </div>
                            </div>

                        {event.status === "PENDING_REVIEW" && (
                            <div className="flex shrink-0 gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleReview(event.id, "publish")
                                    }
                                    disabled={processingId !== null}
                                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                                    className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processingId === event.id
                                        ? "Processing..."
                                        : "Reject"}
                                </button>
                            </div>
                        )}
                        </div>
                    </article>
                ))
            )}
        </main>
    );
}

export default AdminDashboard;