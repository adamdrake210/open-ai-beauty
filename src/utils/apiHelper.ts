import { API_URL_ENDPOINT } from "@/constants/constants";

export const fetchApi = async (url: string, options?: any) => {
  const token = process.env.POSTING_TOKEN!;

  return await fetch(`${API_URL_ENDPOINT}/api/open-ai/${url}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    ...options,
  });
};
