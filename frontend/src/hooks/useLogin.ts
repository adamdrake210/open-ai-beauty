import { GENERIC_ERROR_MESSAGE } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";

type LoginCredentials = {
  email: string;
  password: string;
};

const login = async ({ email, password }: LoginCredentials) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }
  );
  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
  return response;
};

const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      login({ email, password }),
  });
};

export { useLogin, login };
