import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import Layout from "@/layout/Layout";
import { CreatePoemForm } from "@/components/create/CreatePoemForm";
import { SITE_ICON } from "@/constants/constants";
import { parseCookies } from "@/utils/cookies";
import isEmpty from "lodash.isempty";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const data = parseCookies(req);

  if (isEmpty(data)) {
    res.statusCode = 403;
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default function AdminArea() {
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
