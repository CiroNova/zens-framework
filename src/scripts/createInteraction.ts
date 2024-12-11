import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { InteractionGenerator } from '../services/InteractionGenerator';
import { Citizen } from '../models/Citizen';

async function createInteraction() {
  const [theme, ...participants] = process.argv.slice(2);
  
  if (!theme || participants.length < 2) {
    console.log('Usage: npm run interact "theme" "Name1 Surname1" "Name2 Surname2" ...');
    process.exit(1);
  }

  const openAIService = new OpenAIService();
  const storageService = new StorageService();
  await storageService.load();

  const citizens = await storageService.getAllCitizens();
  const selectedParticipants: Citizen[] = [];

  // Verificar y seleccionar participantes
  for (const fullName of participants) {
    const citizenData = citizens.find(c => 
      c.name.toLowerCase() === fullName.toLowerCase()
    );

    if (!citizenData) {
      console.error(`Error: Citizen "${fullName}" not found`);
      process.exit(1);
    }

    selectedParticipants.push(new Citizen(citizenData));
  }

  console.log(`\nGenerating themed interaction with:`);
  console.log(selectedParticipants.map(p => p.name).join(', '));
  console.log(`Theme: ${theme}\n`);

  const interactionGenerator = new InteractionGenerator(openAIService, storageService);
  const messageCount = Math.floor(Math.random() * 3) + 5;
  
  const interaction = await interactionGenerator.generateDetailedInteraction(
    selectedParticipants,
    messageCount,
    theme
  );

  console.log('\nScenario:', interaction.scenario);
  console.log('-------------------');
}

createInteraction().catch(console.error); 