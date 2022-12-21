import ky from "ky-universal";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@prisma/client";

const fetchPost = async (id: Post["id"]) => {
  const parsed = await ky(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
  ).json();
  return parsed as Post;
};

const usePost = (id: Post["id"]) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });
};

export { usePost, fetchPost };
