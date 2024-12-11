# Interactions Documentation

## Overview

Interactions represent significant events or encounters between characters in the system. They are recorded both as unique events and as memories from the perspective of participating characters.

## Interaction Structure

Each interaction in the system has the following components:

### Core Components
- `interactionId`: Unique identifier for the interaction
- `participants`: Array of character IDs involved in the interaction
- `timestamp`: When the interaction occurred (implicit in memory creation date)
- `type`: The nature of the interaction (e.g., "conversation", "collaboration", "conflict")

### Memory Generation
Each interaction generates multiple memory entries:
- One memory per participating character
- Each memory provides a unique perspective on the same event
- Memories maintain emotional context and personal significance

## Emotional Impact

Interactions are measured by their emotional impact on participants:

### Impact Metrics
- `emotionalImpact`: Scale of 0-1 indicating emotional significance
  - 0.9-1.0: Life-changing/profound impact
  - 0.7-0.8: Significant impact
  - 0.5-0.6: Moderate impact
  - 0.3-0.4: Minor impact
  - 0.1-0.2: Minimal impact

### Importance Rating
- `importance`: Scale of 0-1 indicating overall significance
  - Often correlates with emotional impact
  - Reflects long-term significance to character development
  - Influences relationship strength changes

## Interaction Types

Common types of interactions include:

1. **Collaborative Projects**
   - Joint work on community initiatives
   - Shared creative endeavors
   - Environmental projects

2. **Social Encounters**
   - Casual meetings
   - Planned gatherings
   - Community events

3. **Professional Interactions**
   - Work-related collaborations
   - Project partnerships
   - Professional rivalries

4. **Conflict Situations**
   - Disagreements over methods/approaches
   - Resource competition
   - Ideological differences

## Impact on Relationships

Interactions can affect relationship dynamics:

### Positive Effects
- Strengthening bonds through collaboration
- Building trust through shared experiences
- Developing mutual understanding
- Creating shared memories

### Negative Effects
- Creating tensions through disagreements
- Developing rivalries
- Damaging existing relationships
- Establishing antagonistic dynamics

## Memory Formation

How interactions become memories:

1. **Initial Experience**
   - Event occurs between participants
   - Each participant processes the experience

2. **Perspective Recording**
   - Individual memories are created
   - Personal emotions and interpretations are recorded
   - Context is preserved

3. **Impact Assessment**
   - Emotional significance is evaluated
   - Long-term importance is determined
   - Relationship effects are calculated

## Usage in Storytelling

Interactions serve multiple narrative purposes:

1. **Character Development**
   - Reveal personality traits
   - Show growth and change
   - Demonstrate values and beliefs

2. **Relationship Building**
   - Establish new connections
   - Strengthen or weaken existing bonds
   - Create conflict and tension

3. **Plot Development**
   - Drive narrative forward
   - Create story arcs
   - Establish cause and effect

## Technical Implementation

### Storage
- Interactions are stored as unique events
- Connected to character memories via `interactionId`
- Indexed for efficient retrieval

### Retrieval
- Can be accessed by:
  - Interaction ID
  - Participant IDs
  - Time period
  - Type of interaction

### Maintenance
- Regular updates to relationship strengths
- Archival of old interactions
- Maintenance of memory consistency