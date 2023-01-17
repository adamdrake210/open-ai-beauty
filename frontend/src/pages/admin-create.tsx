import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import cookies from "next-cookies";

import Layout from "@/layout/Layout";
import { CreatePoemForm } from "@/components/create/CreatePoemForm";
import { SITE_ICON } from "@/constants/constants";
import { LOGIN } from "@/constants/routeConstants";
import { userFromRequest } from "@/utils/tokens";
import { User } from "@/types/types";
import UserProvider from "@/context/userContext";
import { Box, Title } from "@mantine/core";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const c = cookies(ctx);
  console.log("req.cookies: ", c);
  const data = await userFromRequest(ctx.req);

  if (!data?.userId) {
    ctx.res.statusCode = 403;
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
