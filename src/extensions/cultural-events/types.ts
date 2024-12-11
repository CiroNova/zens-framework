export interface Event {
    id: string;
    name: string;
    type: EventType;
    description: string;
    startDate: number;
    endDate: number;
    location: EventLocation;
    capacity: number;
    participants: Participant[];
    traditions: string[];
    culturalSignificance: number;
    requirements: EventRequirement[];
    budget: EventBudget;
}

export enum EventType {
    FESTIVAL = 'FESTIVAL',
    CELEBRATION = 'CELEBRATION',
    CEREMONY = 'CEREMONY',
    PARADE = 'PARADE',
    EXHIBITION = 'EXHIBITION',
    PERFORMANCE = 'PERFORMANCE',
    WORKSHOP = 'WORKSHOP'
}

export interface EventLocation {
    name: string;
    coordinates: {
        x: number;
        y: number;
    };
    capacity: number;
    indoor: boolean;
    accessibility: number;
}

export interface Participant {
    id: string;
    role: ParticipantRole;
    joinedAt: number;
    contribution: number;
    satisfaction?: number;
}

export enum ParticipantRole {
    ORGANIZER = 'ORGANIZER',
    PERFORMER = 'PERFORMER',
    ATTENDEE = 'ATTENDEE',
    VOLUNTEER = 'VOLUNTEER',
    VENDOR = 'VENDOR'
}

export interface EventRequirement {
    type: RequirementType;
    quantity: number;
    priority: number;
    fulfilled: boolean;
}

export enum RequirementType {
    SPACE = 'SPACE',
    STAFF = 'STAFF',
    EQUIPMENT = 'EQUIPMENT',
    PERMITS = 'PERMITS',
    SECURITY = 'SECURITY'
}

export interface EventBudget {
    total: number;
    allocated: Map<string, number>;
    spent: Map<string, number>;
    revenue: number;
    currency: string;
}

export interface EventImpact {
    culturalShift: number;
    socialCohesion: number;
    economicImpact: number;
    memorability: number;
}

/*
Note: This file is in testing phase and not yet fully integrated with the core framework.
The implementation is subject to change and should not be used in production environments.
*/ 