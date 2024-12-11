export interface Currency {
    code: string;
    name: string;
    symbol: string;
    decimals: number;
    isVirtual: boolean;
    totalSupply: number;
}

export interface Market {
    id: string;
    name: string;
    type: MarketType;
    tradedItems: TradableItem[];
    participants: string[];  // Agent IDs
    currentPrices: Map<string, number>;
}

export enum MarketType {
    GOODS = 'GOODS',
    SERVICES = 'SERVICES',
    VIRTUAL_ASSETS = 'VIRTUAL_ASSETS',
    LABOR = 'LABOR',
    INFORMATION = 'INFORMATION'
}

export interface TradableItem {
    id: string;
    name: string;
    type: MarketType;
    description: string;
    basePrice: number;
    rarity: number;
}

export interface Transaction {
    id: string;
    timestamp: number;
    seller: string;
    buyer: string;
    item: TradableItem;
    quantity: number;
    price: number;
    currency: string;
    marketId: string;
}

/*
Note: This file is in testing phase and not yet fully integrated with the core framework.
The implementation is subject to change and should not be used in production environments.
*/ 