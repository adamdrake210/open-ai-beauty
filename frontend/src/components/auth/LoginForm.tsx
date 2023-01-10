import React from "react";
import { useForm } from "react-hook-form";

import { Loader } from "../common/Loader";
import { handleUnknownError } from "@/utils/handleUnknownError";
import { useRouter } from "next/router";
import { CREATE_POST } from "@/constants/routeConstants";
import { useLogin } from "@/hooks/useLogin";
import { UserContext, UserContextType } from "@/context/userContext";
import { Box, Button, Center, Flex, Input, Title } from "@mantine/core";
import { ErrorMessage } from "../ErrorMessage";

export const LoginForm = () => {
  const router = useRouter();
  const { setUser } = React.useContext(UserContext) as UserContextType;

  const { mutate, isLoading, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      mutate(data, {
        onSuccess: async (data) => {
          const user = await data.json();
          setUser(user);
          reset();
          window.location.href = CREATE_POST;
          // router.push(CREATE_POST);
        },
      });
    } catch (cause) {
      console.error({ cause }, "Failed to login");
    }
  });

  return (
    <Flex direction="column" align="center" my={32}>
      <Title order={3} mb={4}>
        Login with Email
      </Title>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ width: "100%", maxWidth: "250px", mx: "auto" }}
      >
        <Input.Wrapper
          my={8}
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
        {isLoading && <Loader loadingText="Logging in..." />}
        <Center>
          <Button
            type="submit"
            color="primary"
            radius="md"
            size="lg"
            mt={16}
            disabled={isLoading}
          >
            Login
          </Button>
        </Center>
        {isError && <ErrorMessage>{handleUnknownError(error)}</ErrorMessage>}
      </Box>
    </Flex>
  );
};
