import { User } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

const updateUser = async (payload: Partial<User>) => {
  const { id, ...rest } = payload;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ ...rest }),
  });
};

const useUpdateUser = () => {
  return useMutation({
    mutationFn: (payload: Partial<User>) => updateUser(payload),
  });
};

export { useUpdateUser, updateUser };
