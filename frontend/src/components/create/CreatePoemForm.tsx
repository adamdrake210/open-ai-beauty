import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { InputField } from "../common/fields/InputField";
import { Button } from "../common/buttons/Button";
import { Loader } from "../common/Loader";
import { handleUnknownError } from "@/utils/handleUnknownError";
import { useRouter } from "next/router";
import { POEMS } from "@/constants/routeConstants";

export const CreatePoemForm = () => {
  const router = useRouter();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (subject: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ subject }),
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ subject: string }>({
    defaultValues: {
      subject: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      mutate(data.subject, {
        onSuccess: async (data) => {
          console.log(
            "🚀 ~ file: CreatePoemForm.tsx:43 ~ onSuccess ~ data",
            data
          );
          const { id } = await data.json();
          reset();
          router.push(`${POEMS}/${id}`);
        },
        onError: (error) => {
          console.error(error);
          alert("Failed to create poem");
        },
      });
    } catch (cause) {
      console.error({ cause }, "Failed to add post");
    }
  });

  return (
    <form className="w-[50%] min-h-screen" onSubmit={onSubmit}>
      <InputField
        name="subject"
        label="Subject"
        formType="text"
        register={register}
        error={errors.subject}
        required
        disabled={isLoading}
      />
      {isLoading && <Loader loadingText="Creating poem..." />}
      <Button
        type="submit"
        color="primary"
        disabled={isLoading}
        className="mt-2"
      >
        Create Poem
      </Button>
      {isError && (
        <div className="flex justify-center w-full my-4 mx-auto max-w-md p-2 bg-white rounded-lg">
          <p className="text-red-500 m-0">{handleUnknownError(error)}</p>
        </div>
      )}
    </form>
  );
};
