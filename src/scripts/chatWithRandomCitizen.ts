import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { CitizenChat } from './chatWithCitizen';
import { Citizen } from '../models/Citizen';

async function startRandomChat() {
  const openAIService = new OpenAIService();
  const storageService = new StorageService();
  await storageService.load();

  const [firstName, lastName] = process.argv.slice(2);
  const citizens = await storageService.getAllCitizens();
  
  let selectedCitizen: Citizen | null = null;

  if (firstName && lastName) {
    const fullName = `${firstName} ${lastName}`;
    const citizenData = citizens.find(c => c.name.toLowerCase() === fullName.toLowerCase());
    if (citizenData) {
      selectedCitizen = new Citizen(citizenData);
      console.log(`Found citizen: ${selectedCitizen.name}`);
    } else {
      console.log(`Citizen "${fullName}" not found. Selecting random citizen...`);
    }
  }

  if (!selectedCitizen) {
    const randomCitizen = citizens[Math.floor(Math.random() * citizens.length)];
    selectedCitizen = new Citizen(randomCitizen);
    console.log(`Selected random citizen: ${selectedCitizen.name}`);
  }

  const chat = new CitizenChat(openAIService, storageService);
  await chat.startChat(selectedCitizen.id);
}

startRandomChat().catch(console.error); 