import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { Box, Title } from "@mantine/core";

import Layout from "@/layout/Layout";
import config from "@/constants/next-seo.config";
import { SITE_ICON, SITE_URL } from "@/constants/constants";
import UserProvider from "@/context/userContext";
import { checkForUser } from "@/utils/auth/checkForUser";
import { PRIVACY_POLICY } from "@/constants/routeConstants";
import { PrivacyPolicy } from "@/components/info/PrivacyPolicy";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await checkForUser(ctx);
};

export default function PrivacyPolicyPage({
  userId,
}: {
  userId: string | null;
}) {
  const title = "Privacy Policy";
  const description = "Privacy Policy for AI Poetry";
  const url = `${SITE_URL}${PRIVACY_POLICY}`;

  return (
    <UserProvider userId={userId}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <NextSeo
        {...config}
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          description,
        }}
      />
      <Layout>
        <Box component="section" mx="auto" my={32} maw={800}>
          <Title order={1} mb={32}>
            {title}
          </Title>
          <PrivacyPolicy />
        </Box>
      </Layout>
    </UserProvider>
  );
}
