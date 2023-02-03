import React from "react";
import { Box, Divider, Flex, Image, Text, Title } from "@mantine/core";

import { PoemParameters } from "./PoemParameters";
import { Post, User } from "@/types/types";
import { Favorite } from "./Favorite";

type PoemProps = {
  post: Post;
  userId: User["id"] | null;
};

export const Poem = ({ post, userId }: PoemProps) => {
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
          fit="cover"
          radius="md"
          maw={500}
          mah={500}
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
        {userId && <Favorite postSlug={post.slug!} postTitle={post.title} />}
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
