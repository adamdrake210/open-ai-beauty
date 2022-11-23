import { Post } from "@prisma/client";
import Image from "next/image";
import React from "react";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  const { imageUrl, title, content } = post;

  return (
    <div className="rounded-lg mb-8 shadow-lg">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`Image of ${title}`}
          width={500}
          height={500}
          className="rounded-t-lg"
        />
      )}
      <div className="px-6 py-4">
        <h3 className="mb-1">{`${title?.substring(0, 30)}...`}</h3>
        <p className="text-gray-700 text-base mb-1">
          {`${content?.substring(0, 40)}...`}
        </p>
      </div>
    </div>
  );
};
