import React from "react";
import Head from "next/head";

import Layout from "@/layout/Layout";
import { SITE_ICON, SITE_NAME } from "@/constants/constants";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
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
    </>
  );
}
