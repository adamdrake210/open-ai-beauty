import React from "react";
import { useForm } from "react-hook-form";

import { useLoginMutation } from "@/services/api/graphql/generated";
import { Button } from "../common/buttons/Button";
import { InputField } from "../common/fields/InputField";
import { Loader } from "../common/Loader";

export const Login = () => {
  const [loginMutation, { loading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const loginData = await loginMutation({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      console.log("🚀 ~ file: Login.tsx:32 ~ onSubmit ~ loginData", loginData);
      reset();
    } catch (cause) {
      console.error({ cause }, "Failed to add post");
    }
  });

  return (
    <form className="w-[50%] min-h-screen" onSubmit={onSubmit}>
      <InputField
        name="email"
        label="email"
        formType="text"
        register={register}
        error={errors.email}
        required
        disabled={loading}
      />
      <InputField
        name="password"
        label="password"
        formType="password"
        register={register}
        error={errors.password}
        required
        disabled={loading}
      />
      {loading && <Loader loadingText="Logging in..." />}
      <Button type="submit" color="primary" disabled={loading} className="mt-2">
        Login
      </Button>
      {error && (
        <div className="flex justify-center w-full my-4 mx-auto max-w-md p-2 bg-white rounded-lg">
          <p className="text-red-500 m-0">{error.message}</p>
        </div>
      )}
    </form>
  );
};
