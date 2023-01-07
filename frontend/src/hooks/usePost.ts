import ky from "ky-universal";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/types";
import { RQ_POST_KEY } from "@/constants/constants";

const fetchPost = async (id: any["id"]) => {
  const parsed = await ky(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
  ).json();
  return parsed as Post;
};

const usePost = (id: string) => {
  return useQuery({
    queryKey: [RQ_POST_KEY, id],
    queryFn: () => fetchPost(id),
  });
};

export { usePost, fetchPost };
