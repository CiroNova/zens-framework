import { v4 as uuidv4 } from 'uuid';
import { Citizen } from '../models/Citizen';
import { RelationType, IRelationship } from '../types';
import { StorageService } from './StorageService';
import { OpenAIService } from './OpenAIService';

export class RelationshipManager {
  constructor(
    private storageService: StorageService,
    private openAIService: OpenAIService
  ) {}

  async generateFamilyUnit(members: Citizen[]) {
    if (members.length < 3) return;

    // Sort by age to assign roles
    const sortedMembers = [...members].sort((a, b) => b.age - a.age);
    const parents = sortedMembers.slice(0, 2);
    const children = sortedMembers.slice(2);

    // Create family relationships
    if (parents.length === 2) {
      await this.createSpouseRelationship(parents[0], parents[1]);
    }

    for (const parent of parents) {
      for (const child of children) {
        if (this.validateParentChildAges(parent, child)) {
          await this.createParentChildRelationship(parent, child);
        }
      }
    }

    // Create sibling relationships
    for (let i = 0; i < children.length; i++) {
      for (let j = i + 1; j < children.length; j++) {
        await this.createSiblingRelationship(children[i], children[j]);
      }
    }
  }

  private validateParentChildAges(parent: Citizen, child: Citizen): boolean {
    return parent.age >= child.age + 18;
  }

  private async createRelationship(from: Citizen, to: Citizen, type: RelationType, strength: number, context?: string) {
    const relationship: IRelationship = {
      targetId: to.id,
      targetName: to.name,
      type,
      strength,
      context
    };

    from.addRelationship(relationship);
    await this.storageService.updateCitizen(from);
  }

  async generateSocialRelationships(citizens: Citizen[]) {
    for (const citizen of citizens) {
      const potentialAcquaintances = citizens.filter(c => 
        c.id !== citizen.id && 
        !this.hasExistingRelationship(citizen, c)
      );

      for (const other of potentialAcquaintances) {
        const relationshipType = this.determineRelationshipType();
        if (relationshipType) {
          await this.createSocialRelationship(citizen, other, relationshipType);
        }
      }
    }
  }

  private determineRelationshipType(): RelationType | null {
    const chance = Math.random();
    if (chance < 0.4) return 'acquaintance';
    if (chance < 0.6) return 'friend';
    if (chance < 0.7) return 'rival';
    if (chance < 0.75) return 'enemy';
    return null;
  }

  private async createSocialRelationship(from: Citizen, to: Citizen, type: RelationType) {
    const strength = type === 'enemy' || type === 'rival' 
      ? -(Math.random() * 0.5 + 0.5)
      : Math.random() * 0.5 + 0.5;

    const context = await this.generateRelationshipContext(type, from, to);
    
    await this.createRelationship(from, to, type, strength, context);
    
    // Create reciprocal relationship with similar strength
    const reciprocalType = this.getReciprocalRelationType(type);
    await this.createRelationship(to, from, reciprocalType, strength, context);
  }

  private getReciprocalRelationType(type: RelationType): RelationType {
    switch (type) {
      case 'friend': return 'friend';
      case 'rival': return 'rival';
      case 'enemy': return 'enemy';
      case 'acquaintance': return 'acquaintance';
      default: return type;
    }
  }

  private async generateRelationshipContext(type: RelationType, from: Citizen, to: Citizen): Promise<string> {
    const prompt = `Generate a brief context for the relationship between two people:

    Person 1: ${from.name}
    - Occupation: ${from.occupation}
    - Traits: ${from.traits.join(', ')}
    - Values: ${from.values.join(', ')}

    Person 2: ${to.name}
    - Occupation: ${to.occupation}
    - Traits: ${to.traits.join(', ')}
    - Values: ${to.values.join(', ')}

    Relationship type: ${type}

    Generate a 1-2 sentence context explaining their ${type} relationship. Consider their occupations, traits, and values.
    If the relationship is negative (rival/enemy), explain the source of conflict.
    Output in English.`;

    const response = await this.openAIService.generateRelationshipContext(prompt);
    return response;
  }

  private hasExistingRelationship(citizen1: Citizen, citizen2: Citizen): boolean {
    return citizen1.relationships.some(r => r.targetId === citizen2.id);
  }

  private async createSpouseRelationship(spouse1: Citizen, spouse2: Citizen) {
    await this.createRelationship(spouse1, spouse2, 'spouse', 0.8, 'Married');
    await this.createRelationship(spouse2, spouse1, 'spouse', 0.8, 'Married');
  }

  private async createParentChildRelationship(parent: Citizen, child: Citizen) {
    await this.createRelationship(parent, child, 'parent', 0.8, 'Parent of this person');
    await this.createRelationship(child, parent, 'child', 0.8, 'Child of this person');
  }

  private async createSiblingRelationship(sibling1: Citizen, sibling2: Citizen) {
    await this.createRelationship(sibling1, sibling2, 'sibling', 0.7, 'Siblings');
    await this.createRelationship(sibling2, sibling1, 'sibling', 0.7, 'Siblings');
  }
} 