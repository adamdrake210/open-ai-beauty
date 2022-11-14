export const SITE_NAME = "AI Beauty";

export const API_URL_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://openai-beauty.vercel.app"
    : "http://localhost:3000";
