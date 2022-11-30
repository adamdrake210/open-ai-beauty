import { SEOComponent } from "@/components/SEOComponent";
import { SITE_URL } from "@/constants/constants";
import Layout from "@/layout/Layout";
import Head from "next/head";
import React from "react";

const About = () => {
  const title = "About Me";
  const description =
    "Poems generated by OpenAI's GPT-3 language model. This website is investigating the capabilities of GPT-3 and how it can be used to generate poetry.";
  const url = `${SITE_URL}/about`;

  return (
    <>
      <Head>
        <title>About Me</title>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dmiizmobu/image/upload/c_scale,w_64/v1668858555/openai-beauty/DALL_E_2022-11-19_12.46.31_-_Make_a_favicon_representing_AI_being_creative_monkey_pixels_2.png"
        />
        <SEOComponent title={title} description={description} siteUrl={url} />
      </Head>
      <Layout>
        <section className="h-screen max-w-lg mx-auto p-2 my-6 text-lg">
          <h1 className="my-4">About Me</h1>
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
        </section>
      </Layout>
    </>
  );
};

export default About;
