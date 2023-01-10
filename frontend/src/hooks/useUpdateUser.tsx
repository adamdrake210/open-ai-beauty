import { GENERIC_ERROR_MESSAGE } from "@/constants/constants";
import { User } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

const updateUser = async (payload: Partial<User>) => {
  const { id, ...rest } = payload;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...rest }),
    }
  );
  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
  return response;
};

const useUpdateUser = () => {
  return useMutation({
    mutationFn: (payload: Partial<User>) => updateUser(payload),
  });
};

export { useUpdateUser, updateUser };
