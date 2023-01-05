import React from "react";
import { Box, Button, Title } from "@mantine/core";

import { UserContext, UserContextType } from "@/context/userContext";
import { UserProfileInfo } from "./UserProfileInfo";

export const ProfileContainer = () => {
  const { user } = React.useContext(UserContext) as UserContextType;

  return (
    <Box>
      <Title order={1}>User Profile - {user?.firstname}</Title>
      <UserProfileInfo
        firstName={user?.firstname || ""}
        lastName={user?.lastname || ""}
        email={user?.email || ""}
      />
      <Button color="primary">Edit</Button>
    </Box>
  );
};
