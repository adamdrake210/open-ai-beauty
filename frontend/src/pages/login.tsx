import React from "react";
import Head from "next/head";

import Layout from "@/layout/Layout";
import { SITE_ICON, SITE_NAME } from "@/constants/constants";
import { LoginForm } from "@/components/auth/LoginForm";
import { GetServerSideProps } from "next";
import { userFromRequest } from "@/utils/tokens";
import { HOME } from "@/constants/routeConstants";
import UserProvider from "@/context/userContext";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const data = await userFromRequest(req);

  if (data?.userId) {
    return {
      redirect: {
        destination: HOME,
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: null,
    },
  };
};

export default function LoginPage() {
  return (
    <UserProvider userId={null}>
      <Head>
        <title>{SITE_NAME} - Login</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <section className="p-8 flex flex-col items-center max-w-sm mx-auto">
          <h1 className="font-cursive mb-8">Login</h1>
          <div className="w-full min-h-screen flex flex-col items-center">
            <GoogleLoginButton />
            <LoginForm />
          </div>
        </section>
      </Layout>
    </UserProvider>
  );
}
