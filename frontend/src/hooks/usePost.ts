import ky from "ky-universal";
import { useQuery } from "@tanstack/react-query";

const fetchPost = async (id: any["id"]) => {
  const parsed = await ky(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
  ).json();
  return parsed as any; // TODO: add Post type here;
};

const usePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });
};

export { usePost, fetchPost };
