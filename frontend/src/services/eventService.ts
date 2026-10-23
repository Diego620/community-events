import type { Event } from "../types/event";

const API_BASE_URL = "http://localhost:8080/api/events";

async function request(
    url: string,
    options?: RequestInit
): Promise<Response> {
    const response = await fetch(url, options);

    if (!response.ok) {
        let message = `Request failed with status ${response.status}`;

        try {
            const body = await response.json();
            message = body.message ?? message;
        } catch {
            // The error response may not contain valid JSON.
        }

        throw new Error(message);
    }

    return response;
}

export async function getPublishedEvents(): Promise<Event[]> {
    const response = await request(`${API_BASE_URL}/published`);
    return response.json();
}

export async function getAllEvents(): Promise<Event[]> {
    const response = await request(API_BASE_URL);
    return response.json();
}

export async function getEventsByOrganiser(
    organiserId: string
): Promise<Event[]> {
    const response = await request(
        `${API_BASE_URL}?organiserId=${encodeURIComponent(organiserId)}`
    );

    return response.json();
}

export async function createEvent(
    event: Omit<Event, "id" | "status">
): Promise<Event> {
    const response = await request(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    });

    return response.json();
}

export async function updateEvent(
    id: number,
    event: Omit<Event, "id" | "status">
): Promise<Event> {
    const response = await request(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    });

    return response.json();
}

export async function publishEvent(id: number): Promise<Event> {
    const response = await request(`${API_BASE_URL}/${id}/publish`, {
        method: "PATCH",
    });

    return response.json();
}

export async function rejectEvent(id: number): Promise<Event> {
    const response = await request(`${API_BASE_URL}/${id}/reject`, {
        method: "PATCH",
    });

    return response.json();
}

export async function registerInterest(eventId: number): Promise<void> {
    await request(`${API_BASE_URL}/${eventId}/registrations`, {
        method: "POST",
    });
}