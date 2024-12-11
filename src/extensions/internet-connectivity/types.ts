export interface WebSearchResult {
    url: string;
    title: string;
    snippet: string;
    timestamp: number;
    relevanceScore: number;
    source: string;
}

export interface WebInteraction {
    id: string;
    timestamp: number;
    url: string;
    type: WebInteractionType;
    content: string;
    sentiment?: number;
    importance: number;
}

export enum WebInteractionType {
    SEARCH = 'SEARCH',
    READ = 'READ',
    SOCIAL = 'SOCIAL',
    COMMERCE = 'COMMERCE',
    LEARNING = 'LEARNING'
}

export interface WebKnowledge {
    topic: string;
    source: string;
    content: string;
    confidence: number;
    lastUpdated: number;
    relatedTopics: string[];
}

export interface WebPreferences {
    favoriteTopics: string[];
    blockedDomains: string[];
    searchFrequency: number;
    privacyLevel: PrivacyLevel;
}

export enum PrivacyLevel {
    PUBLIC = 'PUBLIC',
    SEMI_PRIVATE = 'SEMI_PRIVATE',
    PRIVATE = 'PRIVATE',
    ANONYMOUS = 'ANONYMOUS'
}

/*
Note: This file is in testing phase and not yet fully integrated with the core framework.
The implementation is subject to change and should not be used in production environments.
*/ 