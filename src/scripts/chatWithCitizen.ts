import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { config } from '../config/config';
import readline from 'readline';
import { Citizen } from '../models/Citizen';

export class CitizenChat {
  constructor(
    private openAIService: OpenAIService,
    private storageService: StorageService
  ) {}

  async startChat(citizenId: string) {
    const citizenData = await this.storageService.getCitizen(citizenId);
    if (!citizenData) return;

    const citizen = new Citizen({
      ...citizenData,
      memories: citizenData.memories
    });

    const context = this.generateFullContext(citizen);
    console.log(`\nChatting with ${citizen.name}`);

    while (true) {
      const userInput = await this.getUserInput();
      if (userInput.toLowerCase() === 'exit') break;

      const response = await this.openAIService.generateChatResponse(context, userInput);
      console.log(`\n${citizen.name}: ${response}\n`);
    }
  }

  private generateFullContext(citizen: Citizen): string {
    const relationships = this.formatRelationships(citizen);
    const recentMemories = citizen.memories
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 5);

    return `
      You are ${citizen.name}
      Age: ${citizen.age}
      Occupation: ${citizen.occupation}
      Traits: ${citizen.traits.join(', ')}
      Values: ${citizen.values.join(', ')}
      Background: ${citizen.background}
      
      Your relationships:
      ${relationships}
      
      Recent memories:
      ${recentMemories.map(m => `- ${m.description}`).join('\n')}
      
      Respond as this character, considering your personality, relationships, and memories.
      Be consistent with your background and emotional connections to others.
    `;
  }

  private formatRelationships(citizen: Citizen): string {
    return citizen.relationships
      .map(r => {
        const relationshipDesc = r.context ? 
          `(${r.context})` : 
          `(Relationship strength: ${r.strength.toFixed(2)})`;
        return `- ${r.targetName}: ${r.type} ${relationshipDesc}`;
      })
      .join('\n');
  }

  private getUserInput(): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(resolve => {
      rl.question('You: ', (input) => {
        rl.close();
        resolve(input);
      });
    });
  }
} 