import React from "react";
import Head from "next/head";

import Layout from "@/layout/Layout";
import { Poems } from "@/components/Poems";
import { SITE_ICON, SITE_NAME } from "@/constants/constants";

export default function Home() {
  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <section className="p-2">
          <h1 className="my-4 font-cursive">Latest Poems</h1>
          <Poems />
        </section>
      </Layout>
    </>
  );
}
