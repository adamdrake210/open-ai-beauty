import React from "react";
import Head from "next/head";

import Layout from "@/layout/Layout";
import { CreatePoemForm } from "@/components/create/CreatePoemForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Admin - Create Poem</title>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dmiizmobu/image/upload/c_scale,w_64/v1668858555/openai-beauty/DALL_E_2022-11-19_12.46.31_-_Make_a_favicon_representing_AI_being_creative_monkey_pixels_2.png"
        />
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
