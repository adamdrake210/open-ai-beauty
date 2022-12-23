import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import Layout from "@/layout/Layout";
import { SITE_ICON, SITE_NAME } from "@/constants/constants";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { userFromRequest } from "@/utils/tokens";
import { HOME } from "@/constants/routeConstants";
import UserProvider from "@/context/userContext";

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

export default function RegisterPage() {
  return (
    <UserProvider userId={null}>
      <Head>
        <title>{SITE_NAME} - Register</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <section className="p-8 flex flex-col items-center max-w-sm mx-auto">
          <h1 className="font-cursive">Sign Up!</h1>
          <RegisterForm />
        </section>
      </Layout>
    </UserProvider>
  );
}
