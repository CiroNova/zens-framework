import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from './OpenAIService';
import { StorageService } from './StorageService';
import { Citizen } from '../models/Citizen';
import { NameRegistry } from './NameRegistry';

export class CitizenGenerator {
  private nameRegistry: NameRegistry;
  private genderBalance: number;
  private occupationPool: string[] = [];

  constructor(
    private openAIService: OpenAIService,
    private storageService: StorageService
  ) {
    this.nameRegistry = NameRegistry.getInstance();
    this.genderBalance = Math.floor(Math.random() * 4);
  }

  async generateCitizen(promptData: { traits: string[], hobbies: string[], occupation: string }): Promise<Citizen> {
    const personalityData = await this.openAIService.generateCitizenPersonality(
      promptData.traits,
      promptData.hobbies,
      promptData.occupation
    );
    
    const citizen = new Citizen(personalityData);
    await this.storageService.addCitizen(citizen);
    return citizen;
  }

  async generateThematicCitizen(theme: string): Promise<Citizen> {
    if (this.occupationPool.length === 0) {
      const occupationsPrompt = `Generate a list of 20 diverse and unique occupations that would exist in ${theme}. 
      Format the response as a JSON array of strings, without markdown formatting.`;
      const response = await this.openAIService.generateSimpleResponse(occupationsPrompt);
      try {
        this.occupationPool = JSON.parse(response);
      } catch (error) {
        console.error('Error parsing occupations:', error);
        this.occupationPool = ["Urban Planner", "Sustainability Consultant", "Community Organizer"]; // fallback
      }
    }

    // Seleccionar y remover una ocupación aleatoria del pool
    const randomIndex = Math.floor(Math.random() * this.occupationPool.length);
    const occupation = this.occupationPool.splice(randomIndex, 1)[0];

    const preferredGender = this.genderBalance <= 1 ? 'male' : 'female';
    this.genderBalance += preferredGender === 'male' ? 1 : -1;

    if (this.genderBalance < 0 || this.genderBalance > 3) {
      this.genderBalance = Math.floor(Math.random() * 4);
    }

    const prompt = `Create a unique citizen for ${theme}.
    The citizen should be ${preferredGender} gender and work as a "${occupation}".
    Include:
    1. A realistic and unique full name (first and last name) that reflects diverse cultural backgrounds. Add only one lastname
    2. Age between 18-80
    3. 3-5 personality traits
    4. 2-3 core values
    5. 2-3 personal strengths
    6. 2-3 personal weaknesses
    7. 2-3 hobbies or interests
    8. 2-3 unique quirks or habits
    9. A brief background story that explains why they chose their occupation

    Format as JSON:
    {
      "name": "full name",
      "age": number,
      "gender": "${preferredGender}",
      "occupation": "${occupation}",
      "traits": ["trait1", "trait2", "trait3"],
      "values": ["value1", "value2"],
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"],
      "hobbies": ["hobby1", "hobby2"],
      "quirks": ["quirk1", "quirk2"],
      "background": "brief background story"
    }`;

    let citizenData;
    let attempts = 0;
    const maxAttempts = 3;

    do {
      citizenData = await this.openAIService.generateCitizenData(prompt);
      attempts++;
    } while (
      this.nameRegistry.isNameTaken(citizenData.name) && 
      attempts < maxAttempts
    );

    if (this.nameRegistry.isNameTaken(citizenData.name)) {
      throw new Error(`Failed to generate unique name after ${maxAttempts} attempts`);
    }

    this.nameRegistry.registerName(citizenData.name);
    return new Citizen(citizenData);
  }
}
