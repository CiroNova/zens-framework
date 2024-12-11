import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { CitizenGenerator } from '../services/CitizenGenerator';
import { characterAttributes } from '../config/characterAttributes';
import { config } from '../config/config';
import { Citizen } from '../models/Citizen';
import { RelationshipManager } from '../services/RelationshipManager';

export class PopulationGenerator {
  constructor(
    private openAIService: OpenAIService,
    private storageService: StorageService,
    private citizenGenerator: CitizenGenerator
  ) {}

  private getRandomElements<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private async generatePersonalityPrompt() {
    const traits = this.getRandomElements(characterAttributes.personalities, 3);
    const hobbies = this.getRandomElements(characterAttributes.hobbies, 2);
    const occupation = this.getRandomElements(characterAttributes.occupations, 1)[0];
    return { traits, hobbies, occupation };
  }

  async generatePopulation(count: number) {
    console.log(`Generating ${count} citizens...`);
    const relationshipManager = new RelationshipManager(this.storageService, this.openAIService);
    const citizens: Citizen[] = [];

    // Generate citizens
    for (let i = 0; i < count; i++) {
      const prompt = await this.generatePersonalityPrompt();
      const citizen = await this.citizenGenerator.generateCitizen(prompt);
      citizens.push(citizen);
      console.log(`Generated citizen ${i + 1}/${count}`);
    }

    // Create families (groups of 3-5 people)
    const unassignedCitizens = [...citizens];
    while (unassignedCitizens.length >= 3) {
      const familySize = Math.floor(Math.random() * 3) + 3; // 3-5 members
      const familyMembers = unassignedCitizens.splice(0, familySize);
      await relationshipManager.generateFamilyUnit(familyMembers);
    }

    // Generate social relationships for all citizens
    await relationshipManager.generateSocialRelationships(citizens);
  }

  async generateThematicPopulation(count: number, theme: string): Promise<Citizen[]> {
    const citizens: Citizen[] = [];
    for (let i = 0; i < count; i++) {
      const citizen = await this.citizenGenerator.generateThematicCitizen(theme);
      await this.storageService.addCitizen(citizen);
      citizens.push(citizen);
      console.log(`Generated citizen ${i + 1}/${count}: ${citizen.name}`);
    }
    return citizens;
  }
} 