import ky from "ky-universal";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/types";
import { GENERIC_ERROR_MESSAGE, RQ_POST_KEY } from "@/constants/constants";

const fetchPost = async (slug: Post["slug"]) => {
  const response = await ky(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`);

  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
  return (await response.json()) as Post;
};

const usePost = (slug: string) => {
  return useQuery({
    queryKey: [RQ_POST_KEY, slug],
    queryFn: () => fetchPost(slug),
  });
};

export { usePost, fetchPost };
