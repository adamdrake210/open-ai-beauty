import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
import { UserContext, UserContextType } from "@/context/userContext";
import { HOME } from "@/constants/routeConstants";
import { Flex, Title } from "@mantine/core";

type GoogleLoginButtonProps = {
  isRegister?: boolean;
};

export const GoogleLoginButton = ({ isRegister }: GoogleLoginButtonProps) => {
  const { setUser } = React.useContext(UserContext) as UserContextType;
  const router = useRouter();

  return (
    <Flex direction="column" align="center">
      <Title order={3} mb={16}>
        {isRegister ? "Sign up" : "Login"} with Google
      </Title>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <GoogleLogin
          text="signup_with"
          onSuccess={async (response) => {
            const googleAuthResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/authentication/google`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  token: response.credential,
                }),
              }
            );
            const user = await googleAuthResponse.json();

            setUser(user);
            router.push(HOME);
          }}
        />
      </GoogleOAuthProvider>
    </Flex>
  );
};
