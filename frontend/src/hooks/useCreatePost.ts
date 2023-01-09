import { GENERIC_ERROR_MESSAGE } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";

const createPost = async (subject: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ subject }),
    }
  );
  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
  return response;
};

const useCreatePost = () => {
  return useMutation({
    mutationFn: (subject: string) => createPost(subject),
  });
};

export { useCreatePost, createPost };
