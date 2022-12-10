import React from "react";
import Image from "next/image";
import { Divider } from "./common/Divider";
import { PoemParameters } from "./PoemParameters";
import { LikeComponent } from "./LikeComponent";
import { GetOnePostQuery } from "@/services/api/graphql/generated";

type PoemProps = {
  post: GetOnePostQuery["post"];
};

export const Poem = ({ post }: PoemProps) => {
  const replaceWhiteSpace = (str: string | null | undefined) =>
    str?.replaceAll(/\n\n/g, "\n").replaceAll(/\n/g, "<br />");

  return (
    <div className="max-w-md mx-auto text-gray-600 my-6">
      <h1 className="text-3xl font-light mb-4">{post?.title}</h1>
      {post?.imageUrl && (
        <Image
          className="rounded-lg shadow-lg"
          src={post.imageUrl}
          alt={`Image of ${post.title}`}
          width={500}
          height={500}
        />
      )}
      <div className="mb-4 md:my-8 px-8 md:px-2">
        <p
          className="text-xl italic"
          dangerouslySetInnerHTML={{
            __html: replaceWhiteSpace(post?.content) || "",
          }}
        />
        <p>By {post?.author}</p>
        <LikeComponent id={post.id} count={post.likeCount} />
      </div>
      <Divider />

      <PoemParameters
        poemRequest={post.poemRequest}
        poemStyle={post.poemStyle}
        poetInspiration={post.poetInspiration}
      />
      <Divider />
    </div>
  );
};
