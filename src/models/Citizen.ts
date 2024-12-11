import { v4 as uuidv4 } from 'uuid';
import { ICitizen, IMemory, IRelationship } from '../types';

export class Citizen implements ICitizen {
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

  constructor(data: Partial<ICitizen>) {
    this.id = data.id || uuidv4();
    this.name = data.name || '';
    this.age = data.age || 0;
    this.occupation = data.occupation || '';
    this.traits = data.traits || [];
    this.hobbies = data.hobbies || [];
    this.strengths = data.strengths || [];
    this.weaknesses = data.weaknesses || [];
    this.quirks = data.quirks || [];
    this.values = data.values || [];
    this.fears = data.fears || [];
    this.dreams = data.dreams || [];
    this.background = data.background || '';
    this.relationships = data.relationships || [];
    this.memories = data.memories || [];
  }

  addMemory(memory: IMemory) {
    this.memories.push(memory);
  }

  addRelationship(relationship: IRelationship) {
    this.relationships.push(relationship);
  }

  getMemoriesByType(type: IMemory['type']) {
    return this.memories.filter(memory => memory.type === type);
  }

  getRelationshipsWith(citizenId: string) {
    return this.relationships.find(rel => rel.targetId === citizenId);
  }

  getRelationshipsByPerson(): Map<string, IRelationship[]> {
    const relationshipMap = new Map<string, IRelationship[]>();
    
    for (const relationship of this.relationships) {
      const existing = relationshipMap.get(relationship.targetId) || [];
      existing.push(relationship);
      relationshipMap.set(relationship.targetId, existing);
    }
    
    return relationshipMap;
  }

  getFormattedRelationships(): string {
    const relationshipMap = this.getRelationshipsByPerson();
    let output = '';
    
    for (const [targetId, relationships] of relationshipMap) {
      const target = relationships[0].targetName || 'Unknown';
      output += `\n${target}:\n`;
      relationships.forEach(r => {
        output += `  - ${r.type} (strength: ${r.strength.toFixed(2)})\n`;
      });
    }
    
    return output;
  }
}
