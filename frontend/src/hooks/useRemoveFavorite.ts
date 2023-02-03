import { GENERIC_ERROR_MESSAGE } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";

const removeFavorite = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/favorites`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ slug }),
    }
  );
  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
  return response;
};

const useRemoveFavorite = () => {
  return useMutation({
    mutationFn: (slug: string) => removeFavorite(slug),
  });
};

export { useRemoveFavorite, removeFavorite };
