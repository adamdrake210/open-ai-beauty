import { Flex, Text, Title } from "@mantine/core";
import React from "react";
import { UserInfoRow } from "./UserInfoRow";

type UserProfileInfoProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export const UserProfileInfo = ({
  firstName,
  lastName,
  email,
}: UserProfileInfoProps) => {
  return (
    <Flex direction="column" my={32}>
      <Title order={2} mb={16}>
        User Information
      </Title>
      <UserInfoRow title="First Name" value={firstName} />
      <UserInfoRow title="Last Name" value={lastName} />
      <UserInfoRow title="Email" value={email} />
    </Flex>
  );
};
