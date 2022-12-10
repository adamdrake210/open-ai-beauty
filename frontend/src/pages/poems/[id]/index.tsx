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
import { useGetOnePostQuery } from "@/services/api/graphql/generated";

export default function PoemPage() {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { data, loading, error } = useGetOnePostQuery({
    variables: {
      postId: String(id),
    },
  });

  const title = data?.post?.title || SITE_NAME;
  const description = data?.post?.content || SITE_DESCRIPTION;
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
              url: data?.post?.imageUrl || SITE_IMAGE,
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
          {loading ? (
            <Loader loadingText="Loading..." />
          ) : (
            <>
              {error ? (
                <p>Something went wrong!</p>
              ) : (
                <>
                  {data?.post ? (
                    <Poem post={data?.post} />
                  ) : (
                    <p>No post found</p>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </Layout>
    </>
  );
}
