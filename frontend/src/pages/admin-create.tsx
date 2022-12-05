import React from "react";
import Head from "next/head";

import Layout from "@/layout/Layout";
import { CreatePoemForm } from "@/components/create/CreatePoemForm";
import { SITE_ICON } from "@/constants/constants";

export default function Home() {
  return (
    <>
      <Head>
        <title>Admin - Create Poem</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <section className="p-2">
          <h1 className="my-4 font-cursive">Create a Poem</h1>
          <CreatePoemForm />
        </section>
      </Layout>
    </>
  );
}
