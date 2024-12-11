import { ICitizen, IRelationship, IInteraction, ILocation } from './index';

export interface IStorageFiles {
  characters: string;  // path to characters.json
  interactions: string;  // path to interactions.json
}

interface StorageMetadata {
  lastUpdate: string;
  version: string;
  count: number;
  theme: string;
  createdAt: string;
}

export interface ICharactersData {
  data: { [key: string]: ICitizen };
  indexes: {
    byOccupation: { [key: string]: string[] };
  };
  metadata: StorageMetadata;
}

export interface IInteractionsData {
  data: { [key: string]: IInteraction };
  indexes: {
    byDate: { [key: string]: string[] };
    byParticipant: { [key: string]: string[] };
  };
  metadata: StorageMetadata;
}

interface IMemory {
  id: string;
  description: string;
  participants: string[];
  emotionalImpact: number;
  type: 'interaction' | 'event';
  importance: number;
  interactionId?: string;
} 