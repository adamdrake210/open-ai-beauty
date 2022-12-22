import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "../common/buttons/Button";
import { InputField } from "../common/fields/InputField";
import { Loader } from "../common/Loader";
import { handleUnknownError } from "@/utils/handleUnknownError";
import { useRouter } from "next/router";
import { CREATE_POST } from "@/constants/routeConstants";

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
        onError: (error) => {
          console.error(error);
          alert("Failed to register account");
        },
      });
    } catch (cause) {
      console.error({ cause }, "Failed to register account");
    }
  });

  return (
    <form
      className="w-full min-h-screen flex flex-col items-center"
      onSubmit={onSubmit}
    >
      <InputField
        name="firstname"
        label="First Name"
        formType="text"
        register={register}
        error={errors.firstname}
        disabled={isLoading}
      />
      <InputField
        name="lastname"
        label="Last Name"
        formType="text"
        register={register}
        error={errors.lastname}
        required
        disabled={isLoading}
      />
      <InputField
        name="email"
        label="Email*"
        formType="text"
        register={register}
        error={errors.email}
        required
        disabled={isLoading}
      />
      <InputField
        name="password"
        label="Password*"
        formType="password"
        register={register}
        error={errors.password}
        required
        disabled={isLoading}
      />
      {isLoading && <Loader loadingText="Registering..." />}
      <Button
        type="submit"
        color="primary"
        disabled={isLoading}
        className="mt-6"
      >
        Sign Up
      </Button>
      {isError && (
        <div className="flex justify-center w-full my-4 mx-auto max-w-md p-2 bg-white rounded-lg">
          <p className="text-red-500 m-0">{handleUnknownError(error)}</p>
        </div>
      )}
    </form>
  );
};
