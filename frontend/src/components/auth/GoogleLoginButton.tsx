import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
import { UserContext, UserContextType } from "@/context/userContext";
import { CREATE_POST } from "@/constants/routeConstants";

export const GoogleLoginButton = () => {
  const { setUser } = React.useContext(UserContext) as UserContextType;
  const router = useRouter();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <GoogleLogin
        text="signup_with"
        onSuccess={async (response) => {
          const googleAuthResponse = await fetch(
            "http://localhost:3001/authentication/google",
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
          router.push(CREATE_POST);
        }}
      />
    </GoogleOAuthProvider>
  );
};
