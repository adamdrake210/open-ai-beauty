import ky from "ky-universal";
import { useMutation } from "@tanstack/react-query";
import { GENERIC_ERROR_MESSAGE } from "@/constants/constants";

const logoutUser = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {
      method: "POST",
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

const useLogout = () => {
  return useMutation({
    mutationFn: (email: string) => logoutUser(),
  });
};

export { useLogout, logoutUser };
