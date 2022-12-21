import ky from "ky-universal";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@prisma/client";

const createPost = async (subject: string) => {
  const parsed = await ky(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
    method: "POST",
    body: JSON.stringify({ subject }),
  }).json();
  return parsed as Post;
};

const useCreatePost = () => {
  return useMutation({
    mutationFn: (subject: string) => createPost(subject),
  });
};

export { useCreatePost, createPost };
