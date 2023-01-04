import ky from "ky-universal";
import { useMutation } from "@tanstack/react-query";

const logoutUser = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: (email: string) => logoutUser(),
  });
};

export { useLogout, logoutUser };
