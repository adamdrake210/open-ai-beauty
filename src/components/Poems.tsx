import React from "react";
import Link from "next/link";

import { trpc } from "@/utils/trpc";
import { Loader } from "./common/Loader";
import { Post } from "@prisma/client";
import { PostCard } from "./PostCard";

export const Poems = () => {
  const { data, isLoading } = trpc.poemRequest.list.useQuery({ limit: 10 });

  return (
    <div className="grid grid-cols-1 my-6 lg:grid-cols-3 lg:gap-8">
      {isLoading ? (
        <Loader loadingText="Loading..." />
      ) : (
        <>
          {data?.items.map((post: Post) => (
            <Link key={post.id} href={`/poems/${post.id}`}>
              <PostCard post={post} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
