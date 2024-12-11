export const characterAttributes = {
  personalities: [
    'extrovert', 'introvert', 'analytical', 'creative', 'organized', 'spontaneous',
    'ambitious', 'relaxed', 'traditional', 'progressive', 'optimistic', 'realistic',
    'emotional', 'rational', 'adventurous', 'cautious', 'confident', 'humble'
  ],
  
  hobbies: [
    'reading', 'painting', 'gardening', 'cooking', 'photography', 'music',
    'sports', 'traveling', 'writing', 'dancing', 'meditation', 'gaming',
    'hiking', 'collecting', 'volunteering', 'fishing', 'crafting'
  ],
  
  occupations: [
    'teacher', 'doctor', 'engineer', 'artist', 'chef', 'writer',
    'entrepreneur', 'police officer', 'nurse', 'architect', 'mechanic',
    'programmer', 'lawyer', 'musician', 'shopkeeper', 'librarian'
  ],

  relationshipTypes: [
    { type: 'friend' as const, maxCount: 5 },
    { type: 'spouse' as const, maxCount: 1 },
    { type: 'parent' as const, maxCount: 2 },
    { type: 'child' as const, maxCount: 4 }
  ]
};