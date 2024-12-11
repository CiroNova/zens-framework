import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from './OpenAIService';
import { StorageService } from './StorageService';
import { Citizen } from '../models/Citizen';
import { IInteraction, IMemory } from '../types';
import { Memory } from '../models/Memory';

export class InteractionGenerator {
  constructor(
    private openAIService: OpenAIService,
    private storageService: StorageService
  ) {}

  async generateDetailedInteraction(
    participants: Citizen[], 
    messageCount: number,
    theme?: string
  ) {
    const participantNames = participants.map(p => p.name);
    
    // Generate scenario with optional theme
    const scenarioData = await this.openAIService.generateScenario(participantNames, theme);
    let conversation = [];
    let currentContext = scenarioData.scenario;

    console.log('\nScenario:');
    console.log(scenarioData.scenario);
    console.log('\nConversation:');

    // Generate Conversation
    for (let i = 0; i < messageCount; i++) {
      const currentSpeaker = participants[i % participants.length];
      const nextSpeaker = participants[(i + 1) % participants.length];
      
      const characterContext = this.generateParticipantContext(currentSpeaker, nextSpeaker);
      
      const response = await this.openAIService.generateResponse(
        characterContext,
        currentContext
      );

      console.log(`\n${currentSpeaker.name}:`);
      console.log(response);

      conversation.push({
        speaker: currentSpeaker.name,
        message: response,
        context: characterContext
      });

      currentContext += `\n${currentSpeaker.name}: ${response}`;
    }

    const interaction: IInteraction = {
      id: uuidv4(),
      participants: participants.map(p => p.id),
      scenario: scenarioData.scenario,
      messages: conversation
    };

    await this.updateParticipantsMemories(participants, interaction);
    await this.storageService.addInteraction(interaction);

    return interaction;
  }

  private generateParticipantContext(speaker: Citizen, target: Citizen): string {
    const recentMemories = speaker.memories
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 5);

    const relationshipsWithTarget = speaker.relationships
      .filter(r => r.targetId === target.id)
      .map(r => `${r.type} (strength: ${r.strength.toFixed(2)})`);

    return `
      Name: ${speaker.name}
      Age: ${speaker.age}
      Occupation: ${speaker.occupation}
      Traits: ${speaker.traits.join(', ')}
      Recent memories: ${recentMemories.map(m => m.description).join('. ')}
      Relationship with ${target.name}: ${relationshipsWithTarget.join(', ') || 'none'}
    `;
  }

  private async updateParticipantsMemories(participants: Citizen[], interaction: IInteraction) {
    for (const participant of participants) {
      if (participant.memories.length > 50) {
        await this.collapseOldMemories(participant);
      }

      const emotionalImpact = await this.calculateEmotionalImpact(
        participant,
        interaction,
        participants
      );

      const perspective = await this.openAIService.generateMemoryPerspective(
        participant.name,
        interaction.scenario,
        interaction.messages,
        participant.traits,
        emotionalImpact
      );

      const memory = new Memory({
        id: uuidv4(),
        description: perspective,
        participants: interaction.participants,
        emotionalImpact,
        type: 'interaction',
        importance: emotionalImpact,
        interactionId: interaction.id
      });

      participant.addMemory(memory);
      await this.updateRelationships(participant, interaction, emotionalImpact);
      await this.storageService.updateCitizen(participant);
    }
  }

  private async collapseOldMemories(citizen: Citizen) {
    const oldMemories = citizen.memories
      .sort((a, b) => b.importance - a.importance)
      .slice(30);

    if (oldMemories.length > 0) {
      const summary = await this.openAIService.generateMemorySummary(oldMemories);
      const collapsedMemory = new Memory({
        description: summary,
        type: 'event',
        emotionalImpact: oldMemories.reduce((acc, m) => acc + m.emotionalImpact, 0) / oldMemories.length,
        participants: [...new Set(oldMemories.flatMap(m => m.participants))]
      });

      citizen.memories = citizen.memories.filter(m => !oldMemories.includes(m));
      citizen.addMemory(collapsedMemory);
    }
  }

  private async calculateEmotionalImpact(
    participant: Citizen,
    interaction: IInteraction,
    participants: Citizen[]
  ): Promise<number> {
    const characterContext = `${participant.name}, ${participant.occupation} with traits: ${participant.traits.join(', ')}`;
    const otherParticipants = participants
      .filter(p => p.id !== participant.id)
      .map(p => p.name)
      .join(', ');
    
    const scenario = `${interaction.scenario}\nInteracted with: ${otherParticipants}\nOutcome: ${interaction.messages.map(m => m.message).join('\n')}`;
    
    const impact = await this.openAIService.generateMemoryImpact(scenario, characterContext);
    return impact.emotionalImpact;
  }

  private async updateRelationships(participant: Citizen, interaction: IInteraction, emotionalImpact: number) {
    const otherParticipants = interaction.participants.filter(id => id !== participant.id);
    
    for (const targetId of otherParticipants) {
      let relationship = participant.relationships.find(r => r.targetId === targetId);
      const target = await this.storageService.getCitizen(targetId);
      
      if (!target) continue;

      if (!relationship) {
        // Crear nueva relación si no existe
        relationship = {
          targetId,
          targetName: target.name,
          type: 'acquaintance',
          strength: 0.5,
          context: ''
        };
        participant.relationships.push(relationship);
      }

      // Ajustar la fuerza de la relación basada en el impacto emocional
      const strengthDelta = emotionalImpact * 0.1; // 10% del impacto emocional
      relationship.strength = Math.max(0, Math.min(1, relationship.strength + strengthDelta));
    }
  }
}
