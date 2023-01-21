import React from "react";
import { Box, Button, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { useDeleteUser } from "@/hooks/useDeleteUser";
import { HOME } from "@/constants/routeConstants";
import { ErrorMessage } from "@/components/ErrorMessage";
import { handleUnknownError } from "@/utils/handleUnknownError";
import Router from "next/router";

type DeleteProfileConfirmationProps = {
  userId: string;
};

export const DeleteProfileConfirmation = ({
  userId,
}: DeleteProfileConfirmationProps) => {
  const { mutate, isLoading, error, isError } = useDeleteUser();

  const handleDeleteUser = () => {
    mutate(userId, {
      onSuccess: () => {
        showNotification({
          title: "Deleted User",
          message: "Your account has been successfully deleted.",
        });
        Router.push(HOME);
      },
    });
  };

  return (
    <Box sx={{ textAlign: "center" }}>
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

      {isError && <ErrorMessage>{handleUnknownError(error)}</ErrorMessage>}
    </Box>
  );
};
