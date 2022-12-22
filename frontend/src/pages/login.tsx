import React from "react";
import Head from "next/head";

import Layout from "@/layout/Layout";
import { SITE_ICON, SITE_NAME } from "@/constants/constants";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>{SITE_NAME} - Login</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <section className="p-8 flex flex-col items-center max-w-sm mx-auto">
          <h1 className="font-cursive">Login</h1>
          <LoginForm />
        </section>
      </Layout>
    </>
  );
}
