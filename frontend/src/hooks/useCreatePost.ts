import ky from "ky-universal";
import { useMutation } from "@tanstack/react-query";

const createPost = async (subject: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ subject }),
  });
};

const useCreatePost = () => {
  return useMutation({
    mutationFn: (subject: string) => createPost(subject),
  });
};

export { useCreatePost, createPost };
