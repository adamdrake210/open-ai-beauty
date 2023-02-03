import React from "react";
import Head from "next/head";
import { Box, Title } from "@mantine/core";
import { GetServerSideProps } from "next";

import Layout from "@/layout/Layout";
import { SITE_ICON } from "@/constants/constants";
import { User } from "@/types/types";
import UserProvider from "@/context/userContext";
import { ensureAuth } from "@/utils/auth/ensureAuth";
import { FavoritesContainer } from "@/components/favorites/FavoritesContainer";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return ensureAuth(ctx);
};

export default function FavoritesPage({ userId }: { userId: User["id"] }) {
  return (
    <UserProvider userId={userId}>
      <Head>
        <title>Favorites</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <Box component="section" py="md" h="100vh">
          <Title order={1} mb="md">
            Favorites
          </Title>
          <FavoritesContainer />
        </Box>
      </Layout>
    </UserProvider>
  );
}
