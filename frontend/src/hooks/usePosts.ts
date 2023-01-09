import ky from "ky-universal";
import { useQuery } from "@tanstack/react-query";
import { Posts } from "@/types/types";
import { GENERIC_ERROR_MESSAGE, RQ_POSTS_KEY } from "@/constants/constants";

const fetchPosts = async (limit = 10) => {
  const response = await ky(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/list?limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
  return (await response.json()) as Posts;
};

const usePosts = (limit: number) => {
  return useQuery({
    queryKey: [RQ_POSTS_KEY, limit],
    queryFn: () => fetchPosts(limit),
  });
};

export { usePosts, fetchPosts };
