import { useMutation, useQuery } from "@tanstack/react-query";
import { GENERIC_ERROR_MESSAGE, RQ_USER_KEY } from "@/constants/constants";
import { User } from "@/types/types";

const deleteUser = async (id: any["id"]) => {
  if (!id) {
    return null;
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }

  return response;
};

const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
  });
};

export { useDeleteUser, deleteUser };
