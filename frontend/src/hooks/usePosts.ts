import ky from "ky-universal";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@prisma/client";

type Posts = {
  items: Post[];
  nextCursor: string | null;
};

const fetchPosts = async (limit = 10) => {
  const parsed = await ky(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/list?limit=${limit}`
  ).json();
  return parsed as Posts;
};

const usePosts = (limit: number) => {
  return useQuery({
    queryKey: ["posts", limit],
    queryFn: () => fetchPosts(limit),
  });
};

export { usePosts, fetchPosts };
