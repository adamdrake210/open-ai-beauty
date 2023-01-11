import React from "react";
import Link from "next/link";
import { Button, Center, SimpleGrid } from "@mantine/core";

import { Loader } from "./common/Loader";
import { PostCard } from "./PostCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Post } from "@/types/types";
import { ErrorMessage } from "./ErrorMessage";
import { handleUnknownError } from "@/utils/handleUnknownError";

export const Poems = () => {
  // *Warning - this is a hacky way to get the next cursor
  const fetchProjects = async ({ pageParam = "clcoj1mtm0264j50pwlp3tnh8" }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/list?limit=9&cursor=${pageParam}`
    );
    return res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return (
    <>
      {isLoading ? (
        <Center>
          <Loader loadingText="Loading..." />
        </Center>
      ) : (
        <>
          <SimpleGrid
            cols={3}
            spacing="xl"
            breakpoints={[
              { maxWidth: 980, cols: 3, spacing: "md" },
              { maxWidth: 755, cols: 2, spacing: "sm" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {data?.pages?.map((page) => {
              return page.items?.map((post: Post) => (
                <Link key={post.id} href={`/poems/${post.id}`}>
                  <PostCard post={post} />
                </Link>
              ));
            })}
          </SimpleGrid>

          <Center my={32}>
            <Button
              onClick={() => fetchNextPage()}
              color="primary"
              disabled={!hasNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More Poems"
                : "Nothing more to load"}
            </Button>
          </Center>
          {isError && <ErrorMessage>{handleUnknownError(error)}</ErrorMessage>}
        </>
      )}
    </>
  );
};
