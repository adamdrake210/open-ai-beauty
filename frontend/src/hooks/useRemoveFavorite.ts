import { GENERIC_ERROR_MESSAGE } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";

const removeFavorite = async (postId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/favorites`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ postId }),
    }
  );
  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
  return response;
};

const useRemoveFavorite = () => {
  return useMutation({
    mutationFn: (postId: string) => removeFavorite(postId),
  });
};

export { useRemoveFavorite, removeFavorite };
