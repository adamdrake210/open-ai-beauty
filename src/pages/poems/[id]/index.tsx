import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

import { trpc } from "@/utils/trpc";
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

export default function PoemPage() {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { data: post, isLoading } = trpc.poemRequest.getOne.useQuery({
    id: id as string,
  });

  const title = post?.title || SITE_NAME;
  const description = post?.content || SITE_DESCRIPTION;
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
              url: post?.imageUrl || SITE_IMAGE,
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
            <>{post ? <Poem post={post} /> : <p>No post found</p>}</>
          )}
        </section>
      </Layout>
    </>
  );
}
