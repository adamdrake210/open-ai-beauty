import React from "react";
import { Anchor, Box, Button, Flex } from "@mantine/core";

import { useDeleteUser } from "@/hooks/useDeleteUser";
import { HOME } from "@/constants/routeConstants";
import { ErrorMessage } from "@/components/ErrorMessage";
import { handleUnknownError } from "@/utils/handleUnknownError";

type DeleteProfileConfirmationProps = {
  userId: string;
};

export const DeleteProfileConfirmation = ({
  userId,
}: DeleteProfileConfirmationProps) => {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );
  const { mutate, isLoading, error, isError } = useDeleteUser();

  const handleDeleteUser = () => {
    mutate(userId, {
      onSuccess: () => {
        setSuccessMessage("Your account has been deleted.");
      },
    });
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      {!successMessage ? (
        <>
          <p>Are you sure you want to delete your profile?</p>
          <Flex justify="center">
            <Button
              color="red"
              mr={8}
              onClick={handleDeleteUser}
              disabled={isLoading}
            >
              Delete
            </Button>
            <Button color="grape" variant="outline">
              Cancel
            </Button>
          </Flex>
        </>
      ) : (
        <Box>
          <p>{successMessage}</p>
          <Anchor href={HOME}>Home</Anchor>
        </Box>
      )}
      {isError && <ErrorMessage>{handleUnknownError(error)}</ErrorMessage>}
    </Box>
  );
};
