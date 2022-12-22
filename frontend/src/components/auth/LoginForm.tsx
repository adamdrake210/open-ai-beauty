import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "../common/buttons/Button";
import { InputField } from "../common/fields/InputField";
import { Loader } from "../common/Loader";
import { handleUnknownError } from "@/utils/handleUnknownError";
import { useRouter } from "next/router";
import { CREATE_POST } from "@/constants/routeConstants";

export const LoginForm = () => {
  const router = useRouter();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
    },
  });

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
          console.log(
            "🚀 ~ file: Login.tsx:32 ~ onSubmit ~ loginData",
            await data.json()
          );
          reset();
          router.push(CREATE_POST);
        },
        onError: (error) => {
          console.error(error);
          alert("Failed to login");
        },
      });
    } catch (cause) {
      console.error({ cause }, "Failed to login");
    }
  });

  return (
    <form
      className="w-full min-h-screen flex flex-col items-center"
      onSubmit={onSubmit}
    >
      <InputField
        name="email"
        label="email"
        formType="text"
        register={register}
        error={errors.email}
        required
        disabled={isLoading}
      />
      <InputField
        name="password"
        label="password"
        formType="password"
        register={register}
        error={errors.password}
        required
        disabled={isLoading}
      />
      {isLoading && <Loader loadingText="Logging in..." />}
      <Button
        type="submit"
        color="primary"
        disabled={isLoading}
        className="mt-6"
      >
        Login
      </Button>
      {isError && (
        <div className="flex justify-center w-full my-4 mx-auto max-w-md p-2 bg-white rounded-lg">
          <p className="text-red-500 m-0">{handleUnknownError(error)}</p>
        </div>
      )}
    </form>
  );
};
