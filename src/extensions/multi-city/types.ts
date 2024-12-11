export interface InterCityEvent {
    id: string;
    sourceCity: string;
    targetCity: string;
    type: InterCityEventType;
    data: any;
    timestamp: number;
}

export enum InterCityEventType {
    CITIZEN_MIGRATION = 'CITIZEN_MIGRATION',
    TRADE = 'TRADE',
    CULTURAL_EXCHANGE = 'CULTURAL_EXCHANGE',
    DIPLOMATIC_RELATION = 'DIPLOMATIC_RELATION',
    JOINT_PROJECT = 'JOINT_PROJECT'
}

export interface CityRelation {
    cityId1: string;
    cityId2: string;
    relationshipType: CityRelationType;
    strength: number;
    establishedAt: number;
    lastInteraction: number;
}

export enum CityRelationType {
    ALLIED = 'ALLIED',
    TRADING_PARTNERS = 'TRADING_PARTNERS',
    CULTURAL_EXCHANGE = 'CULTURAL_EXCHANGE',
    COMPETITIVE = 'COMPETITIVE',
    NEUTRAL = 'NEUTRAL'
}

/*
Note: This file is in testing phase and not yet fully integrated with the core framework.
The implementation is subject to change and should not be used in production environments.
*/ 