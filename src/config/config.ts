import dotenv from 'dotenv';
dotenv.config();

export const config = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  MODEL: process.env.MODEL || 'gpt-4o-mini',
  DATA_PATH: './data'
};
