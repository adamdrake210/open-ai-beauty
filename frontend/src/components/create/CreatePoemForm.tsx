import React from "react";
import { useForm } from "react-hook-form";

import { InputField } from "../common/fields/InputField";
import { Loader } from "../common/Loader";
import { handleUnknownError } from "@/utils/handleUnknownError";
import { useRouter } from "next/router";
import { POEMS } from "@/constants/routeConstants";
import { useCreatePost } from "@/hooks/useCreatePost";
import { Button } from "@mantine/core";

export const CreatePoemForm = () => {
  const router = useRouter();
  const { mutate, isLoading, isError, error } = useCreatePost();

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
          const { id } = await data.json();
          router.push(`${POEMS}/${id}`);
          reset();
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
    <form className="w-full md:w-[50%] min-h-screen" onSubmit={onSubmit}>
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
        // color="primary"
        disabled={isLoading}
        // className="mt-2"
        size="md"
        radius="md"
        color="grape"
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
