import ky from "ky-universal";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/types";
import { GENERIC_ERROR_MESSAGE, RQ_POST_KEY } from "@/constants/constants";

const fetchPost = async (id: any["id"]) => {
  const response = await ky(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
  return (await response.json()) as Post;
};

const usePost = (id: string) => {
  return useQuery({
    queryKey: [RQ_POST_KEY, id],
    queryFn: () => fetchPost(id),
  });
};

export { usePost, fetchPost };
