import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Loader } from "../common/Loader";
import { handleUnknownError } from "@/utils/handleUnknownError";
import { useRouter } from "next/router";
import { Box, Button, Center, Flex, Input, Title } from "@mantine/core";
import { ErrorMessage } from "../ErrorMessage";
import { UserContext, UserContextType } from "@/context/userContext";
import { HOME } from "@/constants/routeConstants";
import { showNotification } from "@mantine/notifications";

export const RegisterForm = () => {
  const [passwordError, setPasswordError] = React.useState("");
  const { setUser } = React.useContext(UserContext) as UserContextType;
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
    confirmpassword?: string;
  }>({
    defaultValues: {
      firstname: null,
      lastname: null,
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    setPasswordError("");

    if (data.password !== data.confirmpassword) {
      setPasswordError("Passwords do not match. Please re-enter passwords.");
      return;
    }
    try {
      mutate(data, {
        onSuccess: async (data) => {
          const user = await data.json();
          console.log(
            "🚀 ~ file: RegisterForm.tsx:73 ~ onSuccess: ~ user",
            user
          );
          setUser(user);
          reset();
          showNotification({
            title: "Account Created!",
            message: "Your account has been successfully created.",
          });
          router.push(HOME);
        },
      });
    } catch (cause) {
      console.error({ cause }, "Failed to register account");
    }
  });

  return (
    <Flex direction="column" align="center" my={32}>
      <Title order={3} mb={4}>
        Sign up with Email
      </Title>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ width: "250px", mx: "auto" }}
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
              minLength: {
                value: 8,
                message: `Password must be at least 8 characters`,
              },
            })}
            placeholder="Enter a secure password here"
          />
        </Input.Wrapper>

        <Input.Wrapper
          sx={{ marginBottom: 8 }}
          id="confirmpassword"
          withAsterisk
          label="Confirm Password"
          error={errors.password?.message}
        >
          <Input
            id="confirmpassword"
            type="password"
            disabled={isLoading}
            {...register("confirmpassword", {
              required: {
                value: true,
                message: `Please complete this required field`,
              },
              minLength: {
                value: 8,
                message: `Password must be at least 8 characters`,
              },
            })}
            placeholder="Confirm your password here"
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
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      </Box>
    </Flex>
  );
};
