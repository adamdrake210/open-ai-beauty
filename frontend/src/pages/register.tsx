import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import Layout from "@/layout/Layout";
import { SITE_ICON, SITE_NAME } from "@/constants/constants";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { userFromRequest } from "@/utils/tokens";
import { HOME } from "@/constants/routeConstants";
import UserProvider from "@/context/userContext";
import { Flex, Title } from "@mantine/core";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const data = await userFromRequest(req);

  if (data?.userId) {
    return {
      redirect: {
        destination: HOME,
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: null,
    },
  };
};

export default function RegisterPage() {
  return (
    <UserProvider userId={null}>
      <Head>
        <title>{SITE_NAME} - Register</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <Layout>
        <Flex
          p={32}
          direction="column"
          align="center"
          maw="40%"
          mx="auto"
          mih="100vh"
        >
          <Title order={1} mb={24}>
            Sign Up!
          </Title>
          <RegisterForm />
        </Flex>
      </Layout>
    </UserProvider>
  );
}
