import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Box, Title } from "@mantine/core";

import Layout from "@/layout/Layout";
import { CreatePoemForm } from "@/components/create/CreatePoemForm";
import { SITE_ICON } from "@/constants/constants";
import { User } from "@/types/types";
import UserProvider from "@/context/userContext";
import { ensureAuth } from "@/utils/auth/ensureAuth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return ensureAuth(ctx);
};

export default function AdminArea({ userId }: { userId: User["id"] }) {
  return (
    <UserProvider userId={userId}>
      <Head>
        <title>Admin - Create Poem</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <Box component="section" py="md">
          <Title order={1} mb={24}>
            Create a Poem
          </Title>
          <CreatePoemForm />
        </Box>
      </Layout>
    </UserProvider>
  );
}
