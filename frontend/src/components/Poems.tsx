import React from "react";
import Link from "next/link";

import { Loader } from "./common/Loader";
import { PostCard } from "./PostCard";
import { Button } from "./common/buttons/Button";
import { useGetAllPostsQuery } from "@/services/api/graphql/generated";

export const Poems = () => {
  // const { data, isLoading, fetchNextPage, hasNextPage } =
  //   trpc.poemRequest.list.useInfiniteQuery(
  //     { limit: 9 },
  //     {
  //       getNextPageParam: (lastPage) => lastPage.nextCursor,
  //     }
  //   );

  const { data, loading, error } = useGetAllPostsQuery();

  return (
    <>
      {loading ? (
        <div className="flex justify-center w-full">
          <Loader loadingText="Loading..." />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 my-6 md:grid-cols-3 md:gap-4 lg:gap-8 w-full">
            {data?.posts.map((post) => (
              <Link key={post.id} href={`/poems/${post.id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </div>
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
