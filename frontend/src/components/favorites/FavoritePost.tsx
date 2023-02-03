import React from "react";
import Link from "next/link";
import { Center } from "@mantine/core";

import { usePost } from "@/hooks/usePost";
import { Loader } from "../common/Loader";
import { PostCard } from "../PostCard";
import { ErrorMessage } from "../ErrorMessage";
import { handleUnknownError } from "@/utils/handleUnknownError";

type FavoritePostProps = {
  slug: string;
};

export const FavoritePost = ({ slug }: FavoritePostProps) => {
  const { data, isLoading, isError, error } = usePost(slug as string);

  return (
    <>
      {isLoading ? (
        <Center>
          <Loader loadingText="Loading..." />
        </Center>
      ) : (
        <Link href={`/poems/${slug}`}>
          <PostCard post={data} />
        </Link>
      )}
      {isError && <ErrorMessage>{handleUnknownError(error)}</ErrorMessage>}
    </>
  );
};
