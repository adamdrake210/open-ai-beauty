import React from "react";
import { useForm } from "react-hook-form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

import { Loader } from "../common/Loader";
import { handleUnknownError } from "@/utils/handleUnknownError";
import {
  Anchor,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Input,
  Text,
  Title,
} from "@mantine/core";
import { ErrorMessage } from "../ErrorMessage";
import { UserContext, UserContextType } from "@/context/userContext";
import { HOME, PRIVACY_POLICY, TERMS } from "@/constants/routeConstants";
import { useRegistration } from "@/hooks/useRegistration";
import Link from "next/link";

export const RegisterForm = () => {
  const [passwordError, setPasswordError] = React.useState("");
  const [termsAgreement, setTermsAgreement] = React.useState(false);
  const { setUser } = React.useContext(UserContext) as UserContextType;
  const router = useRouter();

  const { mutate, isLoading, isError, error } = useRegistration();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmpassword?: string;
  }>({
    defaultValues: {
      firstname: "",
      lastname: "",
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

        <Box>
          <Checkbox
            checked={termsAgreement}
            disabled={isLoading}
            onClick={() => setTermsAgreement(!termsAgreement)}
            label={
              <Text>
                By creating an account, you agree to our{" "}
                <Link href={TERMS}>Terms of Service</Link> and{" "}
                <Link href={PRIVACY_POLICY}>Privacy Policy</Link>.
              </Text>
            }
          />
        </Box>

        {isLoading && <Loader loadingText="Registering..." />}
        <Center>
          <Button
            type="submit"
            color="grape"
            radius="md"
            size="lg"
            mt={16}
            disabled={isLoading || !termsAgreement}
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
