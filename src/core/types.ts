export interface City {
    id: string;
    name: string;
    theme: string;
    citizens: Agent[];
    locations: Location[];
    createdAt: number;
    lastUpdated: number;
}

export interface Agent {
    id: string;
    name: string;
    age: number;
    occupation: string;
    traits: string[];
    values: string[];
    background: string;
    relationships: Relationship[];
    memories: Memory[];
}

export interface Location {
    id: string;
    name: string;
    type: LocationType;
    capacity: number;
    currentOccupants: string[];
}

export enum LocationType {
    RESIDENTIAL = 'RESIDENTIAL',
    COMMERCIAL = 'COMMERCIAL',
    INDUSTRIAL = 'INDUSTRIAL',
    PUBLIC = 'PUBLIC',
    RECREATIONAL = 'RECREATIONAL'
}

export interface Relationship {
    targetId: string;
    type: RelationType;
    strength: number;
    context: string;
}

export enum RelationType {
    FAMILY = 'FAMILY',
    FRIEND = 'FRIEND',
    COLLEAGUE = 'COLLEAGUE',
    ACQUAINTANCE = 'ACQUAINTANCE',
    ROMANTIC = 'ROMANTIC'
}

export interface Memory {
    id: string;
    description: string;
    importance: number;
    timestamp: number;
    relatedCitizens: string[];
    emotions: Emotion[];
}

export interface Emotion {
    type: EmotionType;
    intensity: number;
}

export enum EmotionType {
    JOY = 'JOY',
    SADNESS = 'SADNESS',
    ANGER = 'ANGER',
    FEAR = 'FEAR',
    SURPRISE = 'SURPRISE',
    TRUST = 'TRUST'
} 