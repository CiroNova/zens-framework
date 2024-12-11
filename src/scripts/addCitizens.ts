import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { CitizenGenerator } from '../services/CitizenGenerator';
import { PopulationGenerator } from './generateCitizens';
import { RelationshipManager } from '../services/RelationshipManager';
import { Citizen } from '../models/Citizen';

async function addCitizens() {
  const count = process.argv[2] ? parseInt(process.argv[2]) : 5;
  const openAIService = new OpenAIService();
  const storageService = new StorageService();
  await storageService.load();

  // Obtener la temática existente de la ciudad
  const theme = storageService.getCityTheme();

  console.log(`\nAdding ${count} new citizens to the city...\n`);

  const citizenGenerator = new CitizenGenerator(openAIService, storageService);
  const populationGenerator = new PopulationGenerator(
    openAIService,
    storageService,
    citizenGenerator
  );

  // Generar nuevos ciudadanos
  const newCitizens = await populationGenerator.generateThematicPopulation(count, theme);
  
  // Generar relaciones con la población existente
  console.log("\nGenerating relationships with existing citizens...");
  const relationshipManager = new RelationshipManager(storageService, openAIService);
  const existingCitizens = (await storageService.getAllCitizens()).map(data => new Citizen(data));
  await relationshipManager.generateSocialRelationships([...existingCitizens, ...newCitizens]);

  console.log("\nNew citizens have been added successfully!");
}

addCitizens().catch(console.error); 