import { API_URL_ENDPOINT } from "@/constants/constants";

export const fetchApi = async (url: string, options?: any) => {
  return await fetch(`${API_URL_ENDPOINT}/api/open-ai/${url}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      token: process.env.NEXT_PUBLIC_POSTING_TOKEN!,
    },
    ...options,
  });
};
