import { GENERIC_ERROR_MESSAGE } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";

const addFavorite = async (postId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/favorites`,
    {
      method: "POST",
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

const useAddFavorite = () => {
  return useMutation({
    mutationFn: (postId: string) => addFavorite(postId),
  });
};

export { useAddFavorite, addFavorite };
