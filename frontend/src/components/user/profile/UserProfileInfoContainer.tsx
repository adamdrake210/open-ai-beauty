import React, { useState } from "react";
import { Box, Button, Modal, Text, Title } from "@mantine/core";

import { UserContext, UserContextType } from "@/context/userContext";
import { UserProfileInfo } from "./UserProfileInfo";
import { UserProfileForm } from "./UserProfileForm";

export const UserProfileInfoContainer = () => {
  const { user } = React.useContext(UserContext) as UserContextType;
  const [opened, setOpened] = useState(false);

  return (
    <Box>
      <Title order={1}>User Profile - {user?.firstname}</Title>
      <UserProfileInfo
        firstName={user?.firstname || ""}
        lastName={user?.lastname || ""}
        email={user?.email || ""}
      />
      <Button color="primary" onClick={() => setOpened(true)}>
        Edit
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="Edit Profile Information"
      >
        {user ? (
          <UserProfileForm user={user} setOpened={setOpened} />
        ) : (
          <Text color="red">Something went wrong. Please reload the page.</Text>
        )}
      </Modal>
    </Box>
  );
};
