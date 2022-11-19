export const SITE_NAME = "OpenAI GPT-3 Poems!";

export const SITE_URL = "https://openai-beauty.vercel.app";

export const API_URL_ENDPOINT =
  process.env.NODE_ENV === "production" ? SITE_URL : "http://localhost:3000";
