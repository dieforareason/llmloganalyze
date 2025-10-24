import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  LLM_API_KEY: process.env.LLM_API_KEY as string,
  LLM_API_URL: process.env.LLM_API_URL as string,
  GROQ_API_KEY: process.env.GROQ_API_KEY as string,
  GROQ_API_URL: process.env.GROQ_API_URL as string,
};
