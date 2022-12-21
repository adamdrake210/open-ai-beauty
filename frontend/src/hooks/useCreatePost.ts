import ky from "ky-universal";
import { useMutation } from "@tanstack/react-query";

const createPost = async (subject: string) => {
  const parsed = await ky(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
    method: "POST",
    body: JSON.stringify({ subject }),
  }).json();
  return parsed as any; // TODO: add Post type here;
};

const useCreatePost = () => {
  return useMutation({
    mutationFn: (subject: string) => createPost(subject),
  });
};

export { useCreatePost, createPost };
