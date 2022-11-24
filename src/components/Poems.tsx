import React from "react";
import Link from "next/link";

import { trpc } from "@/utils/trpc";
import { Loader } from "./common/Loader";
import { PostCard } from "./PostCard";
import { Button } from "./common/buttons/Button";

export const Poems = () => {
  const { data, isLoading, fetchNextPage } =
    trpc.poemRequest.list.useInfiniteQuery(
      { limit: 9 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  console.log("fetchNextPage", data);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center w-full">
          <Loader loadingText="Loading..." />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 my-6 md:grid-cols-3 md:gap-4 lg:gap-8 w-full">
            {data?.pages.map((page) =>
              page.items.map((post) => (
                <Link key={post.id} href={`/poems/${post.id}`}>
                  <PostCard post={post} />
                </Link>
              ))
            )}
          </div>
          <div className="flex justify-center w-full">
            <Button onClick={() => fetchNextPage()} color="primary">
              Load More
            </Button>
          </div>
        </>
      )}
    </>
  );
};
