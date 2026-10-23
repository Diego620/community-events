export type EventStatus = "PENDING_REVIEW" | "PUBLISHED" | "REJECTED";

export type Role = "visitor" | "organiser" | "admin";

export interface Event {
    id: number;
    title: string;
    description: string;
    eventDate: string;
    capacity: number;
    status: EventStatus;
    organiserId: string;
}