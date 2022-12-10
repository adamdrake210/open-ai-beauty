import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../common/fields/InputField";
import { Button } from "../common/buttons/Button";
import { Loader } from "../common/Loader";
import { useCreatePostMutation } from "@/services/api/graphql/generated";

export const CreatePoemForm = () => {
  const [createPostMutation, { loading, error }] = useCreatePostMutation();

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
      await createPostMutation({
        variables: {
          subject: data.subject,
        },
      });
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
        disabled={loading}
      />
      {loading && <Loader loadingText="Creating poem..." />}
      <Button type="submit" color="primary" disabled={loading} className="mt-2">
        Create Poem
      </Button>
      {error && (
        <div className="flex justify-center w-full my-4 mx-auto max-w-md p-2 bg-white rounded-lg">
          <p className="text-red-500 m-0">{error.message}</p>
        </div>
      )}
    </form>
  );
};
