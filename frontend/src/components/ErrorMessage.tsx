import { Center, Text } from "@mantine/core";
import React from "react";

type ErrorMessageProps = {
  children: string;
};

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Center my={32}>
      <Text size="xl" color="red">
        {children}
      </Text>
    </Center>
  );
};
