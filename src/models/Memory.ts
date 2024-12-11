import { IMemory } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class Memory implements IMemory {
  id: string;
  description: string;
  participants: string[];
  emotionalImpact: number;
  type: 'interaction' | 'event';
  importance: number;
  interactionId?: string;

  constructor(data: Partial<IMemory>) {
    this.id = data.id || uuidv4();
    this.description = data.description || '';
    this.participants = data.participants || [];
    this.emotionalImpact = data.emotionalImpact || 0;
    this.type = (data.type as 'interaction' | 'event') || 'event';
    this.importance = data.emotionalImpact || 0;
    this.interactionId = data.interactionId;
  }
}
