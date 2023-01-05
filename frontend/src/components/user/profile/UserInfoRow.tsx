import { Flex, Text, Title } from "@mantine/core";
import React from "react";

type UserInfoRowProps = {
  title: string;
  value: string;
};

export const UserInfoRow = ({ title, value }: UserInfoRowProps) => {
  return (
    <Flex w="25%" justify="space-between" mb={8} sx={{ fontSize: "1.1rem" }}>
      <Title order={5}>{title}</Title>
      <Text>{value}</Text>
    </Flex>
  );
};
