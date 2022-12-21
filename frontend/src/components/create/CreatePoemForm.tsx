import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../common/fields/InputField";
import { Button } from "../common/buttons/Button";
import { Loader } from "../common/Loader";
import { useCreatePost } from "@/hooks/useCreatePost";
import { handleUnknownError } from "@/utils/handleUnknownError";

export const CreatePoemForm = () => {
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutate(data.subject);
      reset();
      alert("Poem created successfully!");
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
