import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { CitizenGenerator } from '../services/CitizenGenerator';
import { InteractionGenerator } from '../services/InteractionGenerator';
import { PopulationGenerator } from './generateCitizens';
import { InteractionSimulator } from './generateInteractions';
import { RelationshipManager } from '../services/RelationshipManager';

async function initiateCity() {
  const theme = process.argv[2] || "A diverse solarpunk city with a mix of cultures";
  const openAIService = new OpenAIService();
  const storageService = new StorageService();
  await storageService.load();

  console.log(`\nInitializing city with theme: "${theme}"\n`);

  // Generar población inicial
  const citizenGenerator = new CitizenGenerator(openAIService, storageService);
  const populationGenerator = new PopulationGenerator(
    openAIService,
    storageService,
    citizenGenerator
  );
  
  console.log("Generating initial population...");
  const citizens = await populationGenerator.generateThematicPopulation(10, theme);
  
  // Generar relaciones iniciales
  const relationshipManager = new RelationshipManager(storageService, openAIService);
  
  // Crear familias (grupos de 3-5 personas)
  const unassignedCitizens = [...citizens];
  while (unassignedCitizens.length >= 3) {
    const familySize = Math.floor(Math.random() * 3) + 3;
    const familyMembers = unassignedCitizens.splice(0, familySize);
    await relationshipManager.generateFamilyUnit(familyMembers);
  }

  // Generar relaciones sociales
  console.log("\nGenerating initial relationships...")
  await relationshipManager.generateSocialRelationships(citizens);

  // Generar interacciones iniciales
  console.log("\nGenerating initial interactions...");
  const interactionGenerator = new InteractionGenerator(openAIService, storageService);
  const interactionSimulator = new InteractionSimulator(
    openAIService,
    storageService,
    interactionGenerator
  );
  
  await interactionSimulator.generateRandomInteractions(5);
  
  console.log("\nCity initialization complete!");

  await storageService.saveCityMetadata({
    theme,
    createdAt: new Date().toISOString()
  });
}

initiateCity().catch(console.error); 