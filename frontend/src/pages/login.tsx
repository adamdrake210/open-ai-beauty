import React from "react";
import Head from "next/head";

import Layout from "@/layout/Layout";
import { SITE_ICON, SITE_NAME } from "@/constants/constants";
import { Login } from "@/components/auth/Login";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>{SITE_NAME} - Login</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <section className="p-2">
          <h1 className="my-4 font-cursive">Login</h1>
          <Login />
        </section>
      </Layout>
    </>
  );
}
