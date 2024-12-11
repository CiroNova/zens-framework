# Core Concepts

## Overview

Zens Framework is built around several key concepts that work together to create realistic agent-based city simulations. This document explains these core concepts and how they interact.

## Stable Features

### 1. Citizens (Agents)

Citizens are the fundamental units of the simulation. Each citizen has:

- **Identity**
  - Unique ID
  - Name
  - Age
  - Occupation
  - Personality traits
  - Personal values

- **Memory System**
  - Records of interactions
  - Important events
  - Relationships
  - Personal history

- **Relationships**
  - Family connections
  - Friendships
  - Professional networks
  - Social dynamics

### 2. Interactions

Interactions are the dynamic exchanges between citizens that drive the simulation:

- **Types**
  - Casual conversations
  - Family gatherings
  - Professional meetings
  - Social events

- **Components**
  - Participants
  - Context
  - Duration
  - Impact on relationships
  - Memory formation

### 3. Memory Management

The memory system determines how citizens remember and process experiences:

- **Characteristics**
  - Importance rating
  - Emotional impact
  - Related citizens
  - Context preservation
  - Time decay

### 4. Relationship Dynamics

Relationships evolve based on:

- Interaction frequency
- Interaction quality
- Shared experiences
- Compatible values
- Social context

## Experimental Features

> **Note**: The following features are under development and not fully integrated into the core framework.

### Multi-City System
- City networks
- Inter-city relationships
- Citizen migration
- Cultural exchange

### Economic System
- Virtual currencies
- Markets and trade
- Economic relationships
- Resource management

### Internet Connectivity
- Web interactions
- Information access
- Online relationships
- Digital footprint

### Cultural Events
- Festivals and celebrations
- Community gatherings
- Cultural traditions
- Social impact

### Education System
- Skill development
- Knowledge transfer
- Learning institutions
- Educational progression

## Architecture

The framework follows a modular architecture:

```
src/
├── core/           # Stable core functionality
│   ├── agents/     # Citizen management
│   ├── memory/     # Memory system
│   └── social/     # Relationship handling
│
└── extensions/     # Experimental features
    ├── multi-city/
    ├── economy/
    ├── internet/
    ├── culture/
    └── education/
```

## Best Practices

1. **Citizen Management**
   - Start with a small population (10-20 citizens)
   - Build relationships gradually
   - Monitor interaction frequency

2. **Interaction Design**
   - Keep interactions contextually appropriate
   - Balance random and planned interactions
   - Consider relationship history

3. **Memory Handling**
   - Prioritize significant events
   - Maintain reasonable memory limits
   - Consider temporal relevance

4. **Relationship Building**
   - Allow organic relationship growth
   - Consider personality compatibility
   - Balance positive and negative interactions