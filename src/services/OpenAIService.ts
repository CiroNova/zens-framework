import { ICitizen, IScenario, IMemory } from '../types';
import OpenAI from 'openai';
import { config } from '../config/config';

export class OpenAIService {
  private openai: OpenAI;
  private model: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: config.OPENAI_API_KEY
    });
    this.model = config.MODEL;
  }

  async generateCitizenPersonality(traits: string[], hobbies: string[], occupation: string) {
    const prompt = `Create a complex character for a city simulation with the following format:
    {
      "name": "unique full name with ONE surname only",
      "age": number between 18-80,
      "occupation": "${occupation}",
      "traits": ${JSON.stringify(traits)},
      "hobbies": ${JSON.stringify(hobbies)},
      "strengths": [3 key personal strengths],
      "weaknesses": [3 key personal flaws or struggles],
      "quirks": [2-3 unique behavioral patterns or habits],
      "values": [2-3 core beliefs or principles],
      "fears": [1-2 deep personal fears],
      "dreams": [1-2 long-term aspirations],
      "background": "Brief life story (2-3 sentences)"
    }

    Rules:
    1. Name must be unique and culturally diverse, but use only ONE surname
    2. Personality should be complex and sometimes contradictory
    3. Traits and characteristics should influence their relationships
    4. Include specific details that make them memorable
    5. All output must be in English`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: prompt
      }],
    });

    const content = response.choices[0].message.content || '{}';
    const cleanJson = content.replace(/^```json\n|\n```$/g, '').trim();
    return JSON.parse(cleanJson);
  }

  async generateScenario(participants: string[] | ICitizen[], theme?: string): Promise<IScenario> {
    const participantNames = Array.isArray(participants) && typeof participants[0] === 'string' 
      ? participants 
      : (participants as ICitizen[]).map(p => `${p.name} (${p.occupation})`);

    const prompt = `Create a detailed scenario for an interaction between these characters:
    ${participantNames.join(', ')}
    Theme: ${theme}

    Return a JSON object with this exact format:
    {
      "scenario": "detailed scenario description"
    }`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: prompt
      }],
      temperature: 0.8,
      max_tokens: 500
    });

    const content = response.choices[0].message.content || '{}';
    try {
      const cleanJson = content.replace(/```json\n|```|\n/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      if (!parsed.scenario) {
        throw new Error('Missing scenario property in response');
      }
      
      return { scenario: parsed.scenario };
    } catch (error) {
      console.error('Error parsing scenario response:', error);
      return {
        scenario: "The participants meet in a casual setting"
      };
    }
  }

  async generateResponse(characterContext: string, conversationContext: string) {
    const prompt = `You are a character in a conversation. Respond naturally based on your context.
    
    Your character context:
    ${characterContext}

    Current conversation:
    ${conversationContext}

    Rules:
    1. Respond in English
    2. Only include the dialogue text (no actions, descriptions, or character names)
    3. Keep responses concise (1-2 sentences)
    4. Show personality through word choice and tone
    5. Consider relationships and emotional state
    6. Be consistent with character's traits`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: prompt
      }],
    });

    return response.choices[0].message.content || '';
  }

  async generateMemoryImpact(scenario: string, character: string) {
    const prompt = `Analyze how this scenario would emotionally impact the character and generate a memory description.
    Return the response in JSON format without markdown formatting.

    Example input:
    character: "Emma Wilson, compassionate nurse"
    scenario: "Had a heated argument with a colleague about patient care procedures"

    Example output:
    {
      "emotionalImpact": 0.8,
      "description": "Felt frustrated and misunderstood during the argument about patient care, but remained professional.",
      "longTermEffect": "Slightly strained relationship with Dr. Thompson, but strengthened resolve to advocate for patient safety",
      "mood": "concerned but determined"
    }

    Now analyze for:
    character: ${character}
    scenario: ${scenario}`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: prompt
      }],
    });

    const content = response.choices[0].message.content || '{}';
    const cleanJson = content.replace(/^```json\n|\n```$/g, '').trim();
    return JSON.parse(cleanJson);
  }

  async generateMemorySummary(memories: IMemory[]): Promise<string> {
    const prompt = `Summarize these memories into a concise summary that captures the most important aspects:

    Memories:
    ${memories.map(m => `- ${m.description} (Impact: ${m.emotionalImpact})`).join('\n')}

    Return a single paragraph summary.`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: prompt
      }],
    });

    return response.choices[0].message.content || '';
  }

  async generateRelationshipContext(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: prompt
      }],
    });

    return response.choices[0].message.content || '';
  }

  async generateChatResponse(characterContext: string, userInput: string): Promise<string> {
    const prompt = `You are a character in an interactive chat. Respond to the user's input based on your character profile.

    Your character context:
    ${characterContext}

    User input: "${userInput}"

    Rules:
    1. Stay in character at all times
    2. Reference your relationships and memories when relevant
    3. Show emotional responses based on the topic and your personality
    4. Keep responses natural and conversational
    5. If asked about relationships or personal matters, share details based on your character's context
    6. All responses must be in English`;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: prompt
      }],
    });

    return response.choices[0].message.content || '';
  }

  async generateMemoryPerspective(
    characterName: string,
    scenario: string,
    messages: { speaker: string; message: string }[],
    traits: string[],
    emotionalImpact: number
  ): Promise<string> {
    const prompt = `
      As ${characterName}, write a brief first-person memory of this interaction:
      
      Scenario: ${scenario}
      
      Guidelines:
      - Write as a personal memory/reflection
      - Focus on your emotional experience and key takeaways
      - Consider your traits: ${traits.join(', ')}
      - Emotional impact level: ${emotionalImpact}
      - Keep it concise (2-3 lines)
      - Use first person ("I felt...", "When we...")
      
      Example:
      "I felt a mix of frustration and hope during our discussion about the art project. Despite our usual competitive nature, seeing Sarah's genuine interest in collaboration made me reconsider my stance. This moment reminded me that sometimes letting go of control can lead to unexpected opportunities."
    `;

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: prompt
      }],
    });

    return response.choices[0].message.content || '';
  }

  async generateCitizenData(prompt: string) {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: prompt
      }],
    });

    const content = response.choices[0].message.content || '{}';
    const cleanJson = content.replace(/^```json\n|\n```$/g, '').trim();
    return JSON.parse(cleanJson);
  }

  async generateSimpleResponse(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{
        role: "system",
        content: prompt
      }],
    });

    return response.choices[0].message.content || '[]';
  }
}
