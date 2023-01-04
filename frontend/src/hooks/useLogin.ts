import { useMutation } from "@tanstack/react-query";

type LoginCredentials = {
  email: string;
  password: string;
};

const login = async ({ email, password }: LoginCredentials) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
};

const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      login({ email, password }),
  });
};

export { useLogin, login };
