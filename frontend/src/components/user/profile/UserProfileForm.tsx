import React from "react";
import { Box, Button, Center, Input } from "@mantine/core";
import { useForm } from "react-hook-form";

import { handleUnknownError } from "@/utils/handleUnknownError";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { Loader } from "@/components/common/Loader";
import { User } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { RQ_USER_KEY } from "@/constants/constants";

type UserProfileFormProps = {
  user: User;
  setOpened: (opened: boolean) => void;
};

export const UserProfileForm = ({ user, setOpened }: UserProfileFormProps) => {
  const { mutate, isLoading, isError, error } = useUpdateUser();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    id: string;
    firstname: string | null;
    lastname: string | null;
    email: string;
  }>({
    defaultValues: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      mutate(data, {
        onSuccess: () => {
          reset();
          queryClient.invalidateQueries([RQ_USER_KEY]);
          setOpened(false);
        },
        onError: (error) => {
          console.error(error);
          alert("Failed to update account");
        },
      });
    } catch (cause) {
      console.error({ cause }, "Failed to update account");
    }
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ width: "100%", maxWidth: "250px", mx: "auto" }}
    >
      <Input.Wrapper
        sx={{ marginBottom: 8 }}
        id="firstname"
        withAsterisk
        label="First Name"
        error={errors.firstname?.message}
      >
        <Input
          id="firstname"
          disabled={isLoading}
          {...register("firstname", {
            required: {
              value: true,
              message: `Please complete this required field`,
            },
          })}
          placeholder="Enter first name here"
        />
      </Input.Wrapper>

      <Input.Wrapper
        sx={{ marginBottom: 8 }}
        id="lastname"
        withAsterisk
        label="Last Name"
        error={errors.lastname?.message}
      >
        <Input
          id="lastname"
          disabled={isLoading}
          {...register("lastname", {
            required: {
              value: true,
              message: `Please complete this required field`,
            },
          })}
          placeholder="Enter last name here"
        />
      </Input.Wrapper>

      <Input.Wrapper
        sx={{ marginBottom: 8 }}
        id="email"
        withAsterisk
        label="Email"
        error={errors.email?.message}
      >
        <Input
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: {
              value: true,
              message: `Please complete this required field`,
            },
          })}
          placeholder="Enter your email here"
        />
      </Input.Wrapper>

      {isLoading && <Loader loadingText="Updating info..." />}
      <Center>
        <Button
          type="submit"
          color="primary"
          radius="md"
          size="lg"
          mt={16}
          disabled={isLoading}
        >
          Update
        </Button>
      </Center>
      {isError && (
        <div className="flex justify-center w-full my-4 mx-auto max-w-md p-2 bg-white rounded-lg">
          <p className="text-red-500 m-0">{handleUnknownError(error)}</p>
        </div>
      )}
    </Box>
  );
};
