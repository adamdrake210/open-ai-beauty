import React from "react";
import { Post } from "@prisma/client";
import Link from "next/link";

import { PostCard } from "@/components/PostCard";
import { fetchApi } from "@/utils/apiHelper";

async function getOpenAiPosts() {
  const response = await fetchApi("poems/get-all");
  return response.json();
}

export default async function Page() {
  const posts: Post[] = await getOpenAiPosts();

  return (
    <section className="p-4">
      <h1 className="my-4">Poems by AI</h1>
      <div className="grid grid-cols-1 my-6 lg:grid-cols-3 lg:gap-8">
        {posts.map((post: Post) => (
          <Link key={post.id} href={`/poems/${post.id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </section>
  );
}
