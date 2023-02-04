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
import { GetServerSideProps } from "next";
import UserProvider from "@/context/userContext";
import { checkForUser } from "@/utils/auth/checkForUser";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await checkForUser(ctx);
};

export default function PoemPage({ userId }: { userId: string | null }) {
  const router = useRouter();

  const {
    query: { slug },
  } = router;

  const { data, isLoading, isError } = usePost(slug as string);

  const title = data?.title || SITE_NAME;
  const description = data?.content || SITE_DESCRIPTION;
  const url = `${SITE_URL}/poems/${slug}`;

  return (
    <UserProvider userId={userId}>
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
                <>
                  {data ? (
                    <Poem post={data} userId={userId} />
                  ) : (
                    <p>No post found</p>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </Layout>
    </UserProvider>
  );
}
