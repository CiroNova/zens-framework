export interface ICitizen {
  id: string;
  name: string;
  age: number;
  occupation: string;
  traits: string[];
  hobbies: string[];
  strengths: string[];
  weaknesses: string[];
  quirks: string[];
  values: string[];
  fears: string[];
  dreams: string[];
  background: string;
  relationships: IRelationship[];
  memories: IMemory[];
}

export type RelationType = 
  | 'parent' 
  | 'child' 
  | 'spouse' 
  | 'friend' 
  | 'acquaintance'  // acquaintances
  | 'rival'         // rivals
  | 'enemy'         // enemies
  | 'sibling';      // siblings

export interface IRelationship {
  targetId: string;
  targetName: string;
  type: RelationType;
  strength: number;    // 0-1: negative to enemies/rivals
  context?: string;    // Why they meet/are enemies
}

export interface IMemory {
  id: string;
  description: string;
  participants: string[];
  emotionalImpact: number;
  type: 'interaction' | 'event';
  importance: number;
  interactionId?: string;
}

export interface IInteraction {
  id: string;
  participants: string[];
  scenario: string;
  messages: {
    speaker: string;
    message: string;
    context: string;
  }[];
}

export interface ILocation {
  district: string;
  street: string;
  houseNumber: string;
  familyHomeId: string;
}

export interface IScenario {
  scenario: string;
}