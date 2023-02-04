import { GENERIC_ERROR_MESSAGE } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";

type RegistrationCredentials = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const registration = async ({
  firstname,
  lastname,
  email,
  password,
}: RegistrationCredentials) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
      body: JSON.stringify({ firstname, lastname, email, password }),
    }
  );
  if (!response.ok) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
  return response;
};

const useRegistration = () => {
  return useMutation({
    mutationFn: ({
      firstname,
      lastname,
      email,
      password,
    }: RegistrationCredentials) =>
      registration({ firstname, lastname, email, password }),
  });
};

export { useRegistration, registration };
