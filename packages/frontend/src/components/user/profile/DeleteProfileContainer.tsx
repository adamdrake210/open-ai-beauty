import React, { useState } from "react";
import { UserContext, UserContextType } from "@/context/userContext";
import { Box, Button, Modal, Text, Title } from "@mantine/core";
import { DeleteProfileConfirmation } from "./DeleteProfileConfirmation";

export const DeleteProfileContainer = () => {
  const { user } = React.useContext(UserContext) as UserContextType;
  const [opened, setOpened] = useState(false);

  return (
    <Box>
      <Title order={2} mb={24}>
        Danger Zone
      </Title>

      <Button color="red" onClick={() => setOpened(true)}>
        Delete Profile
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="Delete Profile"
      >
        {user ? (
          <DeleteProfileConfirmation userId={user.id} />
        ) : (
          <Text color="red">Something went wrong. Please reload the page.</Text>
        )}
      </Modal>
    </Box>
  );
};
