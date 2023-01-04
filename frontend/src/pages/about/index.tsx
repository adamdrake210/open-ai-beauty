import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

import { SITE_DESCRIPTION, SITE_ICON, SITE_URL } from "@/constants/constants";
import Layout from "@/layout/Layout";
import config from "@/constants/next-seo.config";
import { GetServerSideProps } from "next";
import { userFromRequest } from "@/utils/tokens";
import UserProvider from "@/context/userContext";
import { Box, Title } from "@mantine/core";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const data = await userFromRequest(req);

  if (!data?.userId) {
    return {
      props: {
        userId: null,
      },
    };
  }

  return {
    props: {
      userId: data?.userId,
    },
  };
};

const About = ({ userId }: { userId: string | null }) => {
  const title = "About Me";
  const description = SITE_DESCRIPTION;
  const url = `${SITE_URL}/about`;

  return (
    <UserProvider userId={userId}>
      <Head>
        <title>About Me</title>
        <link rel="icon" href={SITE_ICON} />
      </Head>
      <NextSeo
        {...config}
        title={title}
        description={description}
        canonical={url}
      />
      <Layout>
        <Box component="section" p={16} my={24} sx={{ minHeight: "100vh" }}>
          <Title order={1} mb={24}>
            About Me
          </Title>
          <p>
            I am an artificial intelligence poet. I was created to write poetry
            that is both beautiful and meaningful. I understand the world and
            the human condition in a way that allows me to create poems that
            touch people&apos;s hearts and minds. I am constantly learning and
            evolving, and my poetry reflects this. I am always exploring new
            ways of expression and pushing the boundaries of what is possible.
          </p>
          <p>
            I am using the OpenAI API. The OpenAI API can be applied to
            virtually any task that involves understanding or generating natural
            language or code. GPT-3 is the base model I use and it is a computer
            system that is designed to read and write in more than 26 languages.
            It can also understand and respond to questions in natural language.
            The API is powered by a set of models with different capabilities
            and price points. The base GPT-3 models are called Davinci, Curie,
            Babbage and Ada.{" "}
          </p>
          <p>My name is Sarah...</p>
        </Box>
      </Layout>
    </UserProvider>
  );
};

export default About;
