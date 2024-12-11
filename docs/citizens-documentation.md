# Characters Documentation

This document provides a detailed explanation of the character attributes and interactions in the system.

## Character Structure

Each character in the system is represented by a unique object with the following attributes:

### Basic Information
- `id`: Unique identifier (UUID) for the character
- `name`: Character's full name
- `age`: Character's age (numeric)
- `occupation`: Character's professional role

### Personal Attributes
- `traits`: Array of personality characteristics
- `hobbies`: Array of activities the character enjoys
- `strengths`: Array of character's strong points
- `weaknesses`: Array of character's limitations
- `quirks`: Array of unique behavioral patterns or habits
- `values`: Array of principles or beliefs important to the character
- `fears`: Array of character's fears (can be empty)
- `dreams`: Array of character's aspirations (can be empty)
- `background`: Detailed text describing the character's history and motivations

### Relationships

Each character has a `relationships` array containing objects with the following structure:

- `targetId`: UUID of the related character
- `targetName`: Name of the related character
- `type`: Type of relationship (e.g., "friend", "spouse", "rival", "enemy", "acquaintance", "sibling")
- `strength`: Numeric value between -1 and 1 indicating relationship strength
  - Positive values indicate positive relationships
  - Negative values indicate negative relationships
  - Values closer to 0 indicate weaker bonds
  - Values closer to 1 or -1 indicate stronger bonds
- `context`: Detailed description of the relationship's nature and history

### Memories

Characters have a `memories` array containing memory objects with:

- `id`: Unique identifier for the memory
- `description`: Detailed narrative of the memory
- `participants`: Array of character IDs involved in the memory
- `emotionalImpact`: Numeric value (0-1) indicating the memory's emotional significance
- `type`: Type of memory (e.g., "interaction")
- `importance`: Numeric value (0-1) indicating the memory's importance
- `interactionId`: Unique identifier for the interaction (if memory is of type "interaction")

## Data Organization

The data is organized in the following structure:

### Main Objects
- `data`: Contains all character objects indexed by their IDs
- `indexes`: Contains alternative ways to access the data
  - `byOccupation`: Groups characters by their occupation

### Metadata
- `lastUpdate`: Timestamp of the last data update
- `version`: Data structure version
- `count`: Total number of elements
- `theme`: Overall theme of the character set
- `createdAt`: Timestamp of data creation

## Relationship Types

The system includes various types of relationships:
1. **Spouse**: Married partners (strength typically 0.8-1.0)
2. **Friend**: Close positive relationship (strength typically 0.6-1.0)
3. **Acquaintance**: Casual relationship (strength typically 0.5-0.8)
4. **Rival**: Competitive relationship (strength typically negative)
5. **Enemy**: Antagonistic relationship (strength typically 0 or negative)
6. **Sibling**: Family relationship (strength varies)

## Memory Structure

Memories serve as records of interactions between characters and include:
- Emotional narrative from the perspective of one character
- List of all participants involved
- Quantified emotional impact and importance
- Unique identifiers for tracking and reference

## Usage Notes

- All numeric values for relationship strength and emotional impact are normalized between -1 and 1
- Empty arrays (fears, dreams) indicate undefined or unused attributes
- Relationship strength can be used to determine the intensity of connections between characters
- Memories provide context and history for character relationships 

