import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Loader } from "../common/Loader";
import { handleUnknownError } from "@/utils/handleUnknownError";
import { useRouter } from "next/router";
import { CREATE_POST } from "@/constants/routeConstants";
import { Box, Button, Center, Input } from "@mantine/core";
import { ErrorMessage } from "../ErrorMessage";

export const RegisterForm = () => {
  const router = useRouter();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async ({
      firstname,
      lastname,
      email,
      password,
    }: {
      firstname: string | null;
      lastname: string | null;
      email: string;
      password: string;
    }) => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    firstname: string | null;
    lastname: string | null;
    email: string;
    password: string;
  }>({
    defaultValues: {
      firstname: null,
      lastname: null,
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      mutate(data, {
        onSuccess: () => {
          reset();
          router.push(CREATE_POST);
        },
      });
    } catch (cause) {
      console.error({ cause }, "Failed to register account");
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

      <Input.Wrapper
        sx={{ marginBottom: 8 }}
        id="password"
        withAsterisk
        label="Password"
        error={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          disabled={isLoading}
          {...register("password", {
            required: {
              value: true,
              message: `Please complete this required field`,
            },
          })}
          placeholder="Enter a secure password here"
        />
      </Input.Wrapper>

      {isLoading && <Loader loadingText="Registering..." />}
      <Center>
        <Button
          type="submit"
          color="grape"
          radius="md"
          size="lg"
          mt={16}
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </Center>
      {isError && <ErrorMessage>{handleUnknownError(error)}</ErrorMessage>}
    </Box>
  );
};
