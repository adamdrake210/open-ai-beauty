import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Input } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { Loader } from "../common/Loader";
import { handleUnknownError } from "@/utils/handleUnknownError";
import { POEMS } from "@/constants/routeConstants";
import { useCreatePost } from "@/hooks/useCreatePost";
import { ErrorMessage } from "../ErrorMessage";
import { RQ_POSTS_KEY } from "@/constants/constants";

export const CreatePoemForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
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
          const { slug } = await data.json();
          queryClient.invalidateQueries([RQ_POSTS_KEY]);
          router.push(`${POEMS}/${slug}`);
          reset();
        },
      });
    } catch (cause) {
      console.error({ cause }, "Failed to add post");
    }
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ width: "100%", maxWidth: "500px", mx: "auto", minHeight: "100vh" }}
    >
      <Input.Wrapper
        my={8}
        id="subject"
        withAsterisk
        label="Poem Subject"
        error={errors.subject?.message}
      >
        <Input
          id="subject"
          disabled={isLoading}
          {...register("subject", {
            required: {
              value: true,
              message: `Please complete this required field`,
            },
          })}
          placeholder="Enter a subject for a poem here"
        />
      </Input.Wrapper>

      {isLoading && <Loader loadingText="Creating poem..." />}
      <Button
        type="submit"
        color="primary"
        disabled={isLoading}
        size="md"
        radius="md"
      >
        Create Poem
      </Button>
      {isError && <ErrorMessage>{handleUnknownError(error)}</ErrorMessage>}
    </Box>
  );
};
