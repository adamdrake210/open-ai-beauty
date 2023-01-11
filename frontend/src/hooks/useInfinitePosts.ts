import { GENERIC_ERROR_MESSAGE, RQ_POSTS_KEY } from "@/constants/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

// *Warning - this is a hacky way to get the next cursor
const fetchInfinitePosts = async ({
  pageParam = "clcoj1mtm0264j50pwlp3tnh8",
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/list?limit=9&cursor=${pageParam}`
  );

  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
  return await response.json();
};

const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: [RQ_POSTS_KEY],
    queryFn: fetchInfinitePosts,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
};

export { useInfinitePosts, fetchInfinitePosts };
