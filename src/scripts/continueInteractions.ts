import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { InteractionGenerator } from '../services/InteractionGenerator';
import { config } from '../config/config';
import { Citizen } from '../models/Citizen';

async function continueInteractions() {
  const openAIService = new OpenAIService();
  const storageService = new StorageService();
  await storageService.load();

  const interactionGenerator = new InteractionGenerator(openAIService, storageService);
  const interactionCount = process.argv[2] ? parseInt(process.argv[2]) : 5;

  console.log(`Generating ${interactionCount} new interactions...`);

  for (let i = 0; i < interactionCount; i++) {
    const citizens = await storageService.getAllCitizens();
    const participantCount = Math.floor(Math.random() * 3) + 2;
    const participants = citizens
      .sort(() => 0.5 - Math.random())
      .slice(0, participantCount)
      .map(citizenData => new Citizen(citizenData));

    const messageCount = Math.floor(Math.random() * 3) + 5;
    const interaction = await interactionGenerator.generateDetailedInteraction(
      participants,
      messageCount
    );

    console.log(`\nGenerated interaction ${i + 1}/${interactionCount}`);
    console.log('Participants:', participants.map(p => p.name).join(', '));
    console.log('-------------------');
  }
}

continueInteractions().catch(console.error); 