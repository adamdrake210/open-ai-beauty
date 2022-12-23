import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "../common/buttons/Button";
import { InputField } from "../common/fields/InputField";
import { Loader } from "../common/Loader";
import { handleUnknownError } from "@/utils/handleUnknownError";
import { useRouter } from "next/router";
import { CREATE_POST } from "@/constants/routeConstants";
import { useLogin } from "@/hooks/useLogin";
import { UserContext, UserContextType } from "@/context/userContext";

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
        label="Email"
        formType="text"
        register={register}
        error={errors.email}
        required
        disabled={isLoading}
      />
      <InputField
        name="password"
        label="Password"
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
