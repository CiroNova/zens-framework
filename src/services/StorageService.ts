import fs from 'fs/promises';
import { ICitizen, IInteraction, IRelationship, ILocation } from '../types';
import { IStorageFiles, ICharactersData, IInteractionsData } from '../types/storage';

interface CityMetadata {
  theme: string;
  createdAt: string;
}

export class StorageService {
  private charactersData!: ICharactersData;
  private interactionsData!: IInteractionsData;
  private paths: IStorageFiles;
  private cityMetadata: CityMetadata | null = null;

  constructor() {
    this.paths = {
      characters: './data/characters.json',
      interactions: './data/interactions.json'
    };
    this.initializeEmptyData();
  }

  async load() {
    try {
      const charactersContent = await fs.readFile(this.paths.characters, 'utf-8');
      const interactionsContent = await fs.readFile(this.paths.interactions, 'utf-8');
      
      this.charactersData = JSON.parse(charactersContent);
      this.interactionsData = JSON.parse(interactionsContent);
      if (this.charactersData.metadata) {
        this.cityMetadata = this.charactersData.metadata;
      }
    } catch (error) {
      this.initializeEmptyData();
      await this.saveAll();
    }
  }

  private initializeEmptyData() {
    const metadata = {
      lastUpdate: new Date().toISOString(),
      version: '1.0',
      count: 0,
      theme: "A diverse solarpunk city with a mix of cultures",
      createdAt: new Date().toISOString()
    };

    this.charactersData = {
      data: {},
      indexes: { byOccupation: {} },
      metadata: { ...metadata }
    };

    this.interactionsData = {
      data: {},
      indexes: { byDate: {}, byParticipant: {} },
      metadata: { ...metadata }
    };
  }

  async saveAll() {
    await Promise.all([
      fs.writeFile(this.paths.characters, JSON.stringify(this.charactersData, null, 2)),
      fs.writeFile(this.paths.interactions, JSON.stringify(this.interactionsData, null, 2))
    ]);
  }

  // Character methods
  async addCitizen(citizen: ICitizen) {
    this.charactersData.data[citizen.id] = citizen;
    this.updateCharacterIndexes(citizen);
    this.charactersData.metadata.count++;
    this.charactersData.metadata.lastUpdate = new Date().toISOString();
    await fs.writeFile(this.paths.characters, JSON.stringify(this.charactersData, null, 2));
  }

  // Interaction methods
  async addInteraction(interaction: IInteraction) {
    this.interactionsData.data[interaction.id] = interaction;
    this.updateInteractionIndexes(interaction);
    this.interactionsData.metadata.count++;
    this.interactionsData.metadata.lastUpdate = new Date().toISOString();
    await fs.writeFile(this.paths.interactions, JSON.stringify(this.interactionsData, null, 2));
  }

  async getAllCitizens(): Promise<ICitizen[]> {
    return Object.values(this.charactersData.data);
  }

  async getCitizen(id: string): Promise<ICitizen | undefined> {
    return this.charactersData.data[id];
  }

  async updateCitizen(citizen: ICitizen) {
    await this.addCitizen(citizen);
  }

  private updateCharacterIndexes(citizen: ICitizen) {
    const indexes = this.charactersData.indexes;
    
    // Index by occupation
    if (!indexes.byOccupation[citizen.occupation]) {
      indexes.byOccupation[citizen.occupation] = [];
    }
    indexes.byOccupation[citizen.occupation] = [
      ...new Set([...indexes.byOccupation[citizen.occupation], citizen.id])
    ];
  }

  private updateInteractionIndexes(interaction: IInteraction) {
    const indexes = this.interactionsData.indexes;
    
    // Index by participant
    for (const participantId of interaction.participants) {
      if (!indexes.byParticipant[participantId]) {
        indexes.byParticipant[participantId] = [];
      }
      indexes.byParticipant[participantId].push(interaction.id);
    }
  }

  async saveCityMetadata(metadata: CityMetadata) {
    this.cityMetadata = metadata;
    await this.saveAll();
  }

  getCityTheme(): string {
    return this.cityMetadata?.theme || "A diverse solarpunk city with a mix of cultures";
  }
}
