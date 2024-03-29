import React from "react";
import Head from "next/head";
import { Box, Title } from "@mantine/core";

import Layout from "@/layout/Layout";
import { Poems } from "@/components/Poems";
import { SITE_ICON, SITE_NAME } from "@/constants/constants";
import UserProvider from "@/context/userContext";
import { GetServerSideProps } from "next";
import { checkForUser } from "@/utils/auth/checkForUser";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await checkForUser(ctx);
};

function Home({ userId }: { userId: string | null }) {
  return (
    <UserProvider userId={userId}>
      <Head>
        <title>{SITE_NAME}</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <Box py="md">
          <Title order={1} mb="md">
            Latest Poems
          </Title>
          <Poems />
        </Box>
      </Layout>
    </UserProvider>
  );
}

export default Home;
