import React from "react";
import Link from "next/link";

import { Loader } from "./common/Loader";
import { PostCard } from "./PostCard";
import { usePosts } from "@/hooks/usePosts";
import { Center, SimpleGrid } from "@mantine/core";

export const Poems = () => {
  // const { data, isLoading, fetchNextPage, hasNextPage } =
  //   trpc.poemRequest.list.useInfiniteQuery(
  //     { limit: 9 },
  //     {
  //       getNextPageParam: (lastPage) => lastPage.nextCursor,
  //     }
  //   );
  const { data, isLoading, isFetching } = usePosts(10);

  return (
    <>
      {isLoading ? (
        <Center>
          <Loader loadingText="Loading..." />
        </Center>
      ) : (
        <>
          <SimpleGrid cols={3} spacing="xl">
            {data?.items?.map((post) => (
              <Link key={post.id} href={`/poems/${post.id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </SimpleGrid>

          {/* <div className="flex justify-center w-full">
            <Button
              onClick={() => fetchNextPage()}
              color="primary"
              disabled={!hasNextPage}
            >
              {hasNextPage ? "Load More" : "No More Poems"}
            </Button>
          </div> */}
        </>
      )}
    </>
  );
};
