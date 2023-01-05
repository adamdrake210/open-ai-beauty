import React from "react";
import Head from "next/head";
import { Box } from "@mantine/core";
import { GetServerSideProps } from "next";

import Layout from "@/layout/Layout";
import { SITE_ICON } from "@/constants/constants";
import { LOGIN } from "@/constants/routeConstants";
import { userFromRequest } from "@/utils/tokens";
import { User } from "@/types/types";
import UserProvider from "@/context/userContext";
import { ProfileContainer } from "@/components/user/profile/ProfileContainer";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const data = await userFromRequest(req);

  if (!data?.userId) {
    res.statusCode = 403;
    return {
      redirect: {
        destination: LOGIN,
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: data?.userId,
    },
  };
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
          <ProfileContainer />
        </Box>
      </Layout>
    </UserProvider>
  );
}
