# API Reference

## Core API (Stable)

### City Management

#### `initiate(theme?: string)`
Initializes a new city simulation.
- **Parameters**
  - `theme` (optional): String describing the city theme
- **Returns**: Promise<void>
- **Example**:
  ```typescript
  await initiate("A bustling cyberpunk metropolis");
  ```

#### `addCitizens(count: number, options?: CitizenOptions)`
Adds new citizens to the simulation.
- **Parameters**
  - `count`: Number of citizens to add
  - `options` (optional): Configuration for citizens
- **Returns**: Promise<Citizen[]>
- **Example**:
  ```typescript
  const newCitizens = await addCitizens(5, {
    ageRange: { min: 20, max: 40 },
    occupations: ["teacher", "engineer"]
  });
  ```

#### `generateInteractions(count: number)`
Generates random interactions between citizens.
- **Parameters**
  - `count`: Number of interactions to generate
- **Returns**: Promise<Interaction[]>
- **Example**:
  ```typescript
  const interactions = await generateInteractions(10);
  ```

#### `chatWithCitizen(firstName?: string, lastName?: string)`
Starts a chat session with a citizen.
- **Parameters**
  - `firstName` (optional): Citizen's first name
  - `lastName` (optional): Citizen's last name
- **Returns**: Promise<void>
- **Example**:
  ```typescript
  await chatWithCitizen("John", "Doe");
  ```

### Data Types

#### Citizen
```typescript
interface Citizen {
  id: string;
  name: string;
  age: number;
  occupation: string;
  traits: string[];
  values: string[];
  background: string;
  relationships: Relationship[];
  memories: Memory[];
}
```

#### Relationship
```typescript
interface Relationship {
  targetId: string;
  type: RelationType;
  strength: number;
  context: string;
}
```

#### Memory
```typescript
interface Memory {
  id: string;
  description: string;
  importance: number;
  timestamp: number;
  relatedCitizens: string[];
}
```

## Extension APIs (Experimental)

> **Note**: The following APIs are under development and not fully integrated into the core framework.
> They are subject to change and should not be used in production environments.

### Multi-City System
```typescript
interface CityNetwork {
  addCity(city: City): void;
  connectCities(cityId1: string, cityId2: string): void;
  queueInterCityEvent(event: InterCityEvent): void;
}
```

### Economic System
```typescript
interface EconomicSystem {
  addCurrency(currency: Currency): void;
  createMarket(market: Market): void;
  recordTransaction(transaction: Transaction): void;
}
```

### Internet Connectivity
```typescript
interface InternetAgent {
  searchWeb(query: string): Promise<WebSearchResult[]>;
  interactWithWebContent(url: string): Promise<void>;
  getRelevantWebKnowledge(context: string): WebInteraction[];
}
```

### Cultural Events
```typescript
interface CulturalEventSystem {
  scheduleEvent(event: Event): void;
  startEvent(eventId: string): void;
  endEvent(eventId: string): void;
  getActiveEvents(): Event[];
}
```

### Education System
```typescript
interface LearningSystem {
  learnSkill(agentId: string, skillId: string): Promise<boolean>;
  enrollInCourse(agentId: string, courseId: string): void;
  createInstitution(institution: EducationalInstitution): void;
}
```

## Error Handling

All API methods may throw the following errors:

- `SimulationError`: Base error class for simulation-related issues
- `InvalidInputError`: When provided parameters are invalid
- `StateError`: When operation cannot be performed in current state
- `APIError`: For external API-related issues (e.g., OpenAI)

Example error handling:
```typescript
try {
  await addCitizens(5);
} catch (error) {
  if (error instanceof SimulationError) {
    console.error("Simulation error:", error.message);
  } else {
    throw error;
  }
}
``` 