import React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import Layout from "@/layout/Layout";
import { Poems } from "@/components/Poems";
import { SITE_ICON, SITE_NAME } from "@/constants/constants";
import { fetchPosts } from "@/hooks/usePosts";

function Home() {
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

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", 10],
    queryFn: () => fetchPosts(10),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
