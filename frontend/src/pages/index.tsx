import React from "react";
import Head from "next/head";

import Layout from "@/layout/Layout";
import { Poems } from "@/components/Poems";
import { SITE_ICON, SITE_NAME } from "@/constants/constants";
import UserProvider from "@/context/userContext";
import { GetServerSideProps } from "next";
import { userFromRequest } from "@/utils/tokens";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const data = await userFromRequest(req);

  if (!data?.userId) {
    return {
      props: {
        userId: null,
      },
    };
  }

  return {
    props: {
      userId: data?.userId,
    },
  };
};

function Home({ userId }: { userId: string | null }) {
  return (
    <UserProvider userId={userId}>
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
    </UserProvider>
  );
}

export default Home;
