import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { InteractionGenerator } from '../services/InteractionGenerator';
import { Citizen } from '../models/Citizen';

export class InteractionSimulator {
  constructor(
    private openAIService: OpenAIService,
    private storageService: StorageService,
    private interactionGenerator: InteractionGenerator
  ) {}

  async generateRandomInteractions(count: number) {
    console.log(`Generating ${count} interactions...`);

    for (let i = 0; i < count; i++) {
      const participants = await this.getRandomParticipants();
      const messageCount = Math.floor(Math.random() * 3) + 5; 

      const interaction = await this.interactionGenerator.generateDetailedInteraction(
        participants,
        messageCount
      );

      console.log(`Generated interaction ${i + 1}/${count}`);
      console.log(`Scenario: ${interaction.scenario}`);
      console.log('-------------------');
    }
  }

  private async getRandomParticipants(): Promise<Citizen[]> {
    const citizens = await this.storageService.getAllCitizens();
    const participantCount = Math.floor(Math.random() * 3) + 2;
    const selectedCitizens = citizens
      .sort(() => 0.5 - Math.random())
      .slice(0, participantCount);
    
    return selectedCitizens.map(citizenData => new Citizen(citizenData));
  }
} 