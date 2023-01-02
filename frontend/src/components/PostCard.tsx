import React from "react";
import Image from "next/image";
import { Card, Group, Text, Title } from "@mantine/core";

type PostCardProps = {
  post: any; // TODO work out how to type this properly;
};

export const PostCard = ({ post }: PostCardProps) => {
  const { imageUrl, title, content } = post;

  return (
    <Card shadow="sm" p="lg" radius="md">
      {imageUrl && (
        <Card.Section>
          <Image
            src={imageUrl}
            alt={`Image of ${title}`}
            width={500}
            height={500}
          />
        </Card.Section>
      )}
      <Group position="apart" mt="md" mb="xs">
        <Title order={3}>{`${title?.substring(0, 30)}...`}</Title>
        <Text size="lg" color="gray">
          {`${content?.substring(0, 80)}...`}
        </Text>
      </Group>
    </Card>
  );
};
