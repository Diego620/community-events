import { useEffect, useState } from "react";
import {getPublishedEvents, registerInterest,} from "../services/eventService";
import type { Event } from "../types/event";

function VisitorDashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [registeringId, setRegisteringId] = useState<number | null>(null);
    const [message, setMessage] = useState("");
    const [messageIsError, setMessageIsError] = useState(false);

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
        setMessageIsError(false);

        try {
            await registerInterest(eventId);
            setMessage("Successfully registered your interest!");
        } catch (err) {
            setMessageIsError(true);
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
        return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500">Loading events...</div></main>;
    }

    if (error) {
        return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">Error: {error}</div></main>;
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Explore</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Upcoming community events</h1>
                <p className="mt-3 text-base leading-7 text-slate-600">Find something nearby and let the organiser know you’re interested.</p>
            </div>

            {message && (
                <p
                    role="status"
                    className={`mt-7 rounded-xl border px-4 py-3 text-sm font-semibold ${
                        messageIsError
                            ? "border-red-200 bg-red-50 text-red-700"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                >
                    {message}
                </p>
            )}

            {events.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-20 text-center">
                    <h2 className="text-base font-bold text-slate-900">No published events yet</h2>
                    <p className="mt-1 text-sm text-slate-500">Check back soon for new activities in your community.</p>
                </div>
            ) : (
                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {events.map((event) => (
                        <article key={event.id} className="flex min-h-80 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-lg">
                            <p className="text-xs font-bold uppercase tracking-[0.13em] text-blue-600">Community event</p>
                            <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-950">{event.title}</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{event.description}</p>
                            <div className="mt-6 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-500">
                                <p>📅 {new Date(event.eventDate).toLocaleString()}</p>
                                <p>👥 Capacity: {event.capacity}</p>
                                <p className="font-semibold text-slate-700">Status: {event.status.replace("_", " ")}</p>
                            </div>
                            <button
                                onClick={() => handleRegister(event.id)}
                                disabled={registeringId === event.id}
                                className="mt-auto min-h-11 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {registeringId === event.id ? "Registering..." : "Register interest"}
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}

export default VisitorDashboard;