import React from "react";
import Image from "next/image";
import { Box, Divider, Flex, Text, Title } from "@mantine/core";

import { PoemParameters } from "./PoemParameters";
import { LikeComponent } from "./LikeComponent";
import { Post } from "@/types/types";

type PoemProps = {
  post: Post;
};

export const Poem = ({ post }: PoemProps) => {
  const replaceWhiteSpace = (str: string | null | undefined) =>
    str?.replaceAll(/\n\n/g, "\n").replaceAll(/\n/g, "<br />");

  return (
    <Flex
      mx="auto"
      w="100%"
      maw={450}
      my={32}
      align="center"
      direction="column"
    >
      <Title order={1} mb={24}>
        {post?.title}
      </Title>
      {post?.imageUrl && (
        <Image
          src={post.imageUrl}
          alt={`Image of ${post.title}`}
          width={500}
          height={500}
          priority
        />
      )}
      <Box mt={16} px={16}>
        <Text
          italic
          size="xl"
          color="gray"
          dangerouslySetInnerHTML={{
            __html: replaceWhiteSpace(post?.content) || "",
          }}
        />
        <p>By {post?.author}</p>
        <LikeComponent id={post.id} count={post.likeCount} />
        <Divider my="sm" variant="solid" />
      </Box>

      <PoemParameters
        poemRequest={post.poemRequest}
        poemStyle={post.poemStyle}
        poetInspiration={post.poetInspiration}
      />
    </Flex>
  );
};
