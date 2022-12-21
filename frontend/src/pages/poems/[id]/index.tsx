import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

import Layout from "@/layout/Layout";
import {
  SITE_DESCRIPTION,
  SITE_ICON,
  SITE_IMAGE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/constants/constants";
import { useRouter } from "next/router";
import { Loader } from "@/components/common/Loader";
import { Poem } from "@/components/Poem";
import { usePost } from "@/hooks/usePost";

export default function PoemPage() {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { data, isLoading, isError } = usePost(id as string);

  const title = data?.title || SITE_NAME;
  const description = data?.content || SITE_DESCRIPTION;
  const url = `${SITE_URL}/poems/${id}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          images: [
            {
              url: data?.imageUrl || SITE_IMAGE,
              width: 1200,
              height: 600,
              alt: title,
              type: "image/jpeg",
            },
          ],
          siteName: SITE_NAME,
        }}
        twitter={{
          handle: TWITTER_HANDLE,
          site: TWITTER_HANDLE,
          cardType: "summary_large_image",
        }}
      />
      <Layout>
        <section>
          {isLoading ? (
            <Loader loadingText="Loading..." />
          ) : (
            <>
              {isError ? (
                <p>Something went wrong!</p>
              ) : (
                <>{data ? <Poem post={data} /> : <p>No post found</p>}</>
              )}
            </>
          )}
        </section>
      </Layout>
    </>
  );
}
