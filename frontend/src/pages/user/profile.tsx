import React from "react";
import Head from "next/head";
import { Box, Divider } from "@mantine/core";
import { GetServerSideProps } from "next";

import Layout from "@/layout/Layout";
import { SITE_ICON } from "@/constants/constants";
import { User } from "@/types/types";
import UserProvider from "@/context/userContext";
import { UserProfileInfoContainer } from "@/components/user/profile/UserProfileInfoContainer";
import { DeleteProfileContainer } from "@/components/user/profile/DeleteProfileContainer";
import { ensureAuth } from "@/utils/auth/ensureAuth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return ensureAuth(ctx);
};

export default function UserProfile({ userId }: { userId: User["id"] }) {
  return (
    <UserProvider userId={userId}>
      <Head>
        <title>User Profile</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <Box component="section" py="md" h="100vh">
          <UserProfileInfoContainer />
          <Divider my={32} />
          <DeleteProfileContainer />
        </Box>
      </Layout>
    </UserProvider>
  );
}
