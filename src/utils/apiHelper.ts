import { API_URL_ENDPOINT } from "@/constants/constants";

export const fetchApi = async (url: string, options?: any) => {
  return await fetch(`https://openai-beauty.vercel.app/api/open-ai/${url}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      token: process.env.NEXT_PUBLIC_POSTING_TOKEN!,
    },
    ...options,
  });
};
