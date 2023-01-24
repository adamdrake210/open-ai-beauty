import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { Blockquote, Box, Title } from "@mantine/core";

import Layout from "@/layout/Layout";
import { PageImage } from "@/components/common/images/PageImage";
import { CTAReadPoemsButton } from "@/components/common/buttons/CTAReadPoemsButton";
import config from "@/constants/next-seo.config";
import { SITE_ICON, SITE_URL } from "@/constants/constants";
import UserProvider from "@/context/userContext";
import { checkForUser } from "@/utils/auth/checkForUser";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await checkForUser(ctx);
};

export default function WhatIsPoetry({ userId }: { userId: string | null }) {
  const title = "What is Poetry?";
  const description =
    "Poetry is a type of literature that expresses ideas, emotions, and images through the use of rhythm, imagery, and word choice. It is often written in a metrical pattern and can range from very structured and formal to free-flowing and personal.";
  const url = `${SITE_URL}/pages/what-is-poetry`;

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
            What is Poetry
          </Title>
          <p>
            Poetry is a type of literature that expresses ideas, emotions, and
            images through the use of rhythm, imagery, and word choice. It is
            often written in a metrical pattern and can range from very
            structured and formal to free-flowing and personal. Poetry can be
            used to convey a single thought or emotion, or as a way to explore a
            subject in greater depth.
          </p>

          <Title order={2} mb={24}>
            Different types of Poems
          </Title>
          <p>
            There are different types of poems which come from all types of
            different cultures.
          </p>
          <ol>
            <li>
              <Title order={4} mb={8}>
                Haiku
              </Title>
              A traditional Japanese form of poetry, usually consisting of three
              lines with five syllables in the first line, seven syllables in
              the second line, and five syllables in the third line.
            </li>

            <li>
              <Title order={4} mb={8}>
                Limerick
              </Title>
              A five-line poem with a distinctive rhythm in which the first,
              second, and fifth lines rhyme, while the third and fourth lines
              rhyme with each other.
            </li>

            <li>
              <Title order={4} mb={8}>
                Sonnet
              </Title>
              A fourteen-line poem usually written in iambic pentameter with a
              particular rhyme scheme of abab cdcd efef gg.
            </li>

            <li>
              <Title order={4} mb={8}>
                Free Verse
              </Title>
              A type of poetry that does not follow any particular structure or
              rhyme scheme.
            </li>

            <li>
              <Title order={4} mb={8}>
                Ballad
              </Title>
              A narrative poem with a repeated refrain and simple rhyme scheme.
            </li>

            <li>
              <Title order={4} mb={8}>
                Ode
              </Title>
              A lyric poem that is written in a formal style to honor or praise
              a person, place, or event.
            </li>

            <li>
              <Title order={4} mb={8}>
                Epic
              </Title>
              A lengthy narrative poem that tells a story of heroic deeds and
              events of great significance.
            </li>
          </ol>

          <PageImage
            src="https://res.cloudinary.com/dmiizmobu/image/upload/c_scale,w_500/v1669795290/openai-beauty/DALL_E_2022-11-30_08.57.47_-_an_oil_painting_of_a_poet_writing_at_a_desk_in_a_country_cottage_with_a_window_open_1.png"
            altText="Poet sitting at his desk with the window open"
          />

          <Blockquote cite="– Some AI">
            Poetry can be used to convey a single thought or emotion, or as a
            way to explore a subject in greater depth.
          </Blockquote>

          {/* CTA Button to Poems */}
          <CTAReadPoemsButton />

          <Title order={2} mb={24}>
            Ten famous Poets throughout History
          </Title>
          <p>
            There have been many famous poets throughout history. Below is
            listed just a few which we are sure you will recognise at least a
            few names.
          </p>
          <ol>
            <li>William Shakespeare (1564–1616)</li>
            <li>Emily Dickinson (1830–1886)</li>
            <li>Robert Frost (1874–1963)</li>
            <li>Walt Whitman (1819–1892)</li>
            <li>T.S. Eliot (1888–1965)</li>
            <li>Maya Angelou (1928–2014)</li>
            <li>William Wordsworth (1770–1850)</li>
            <li>John Keats (1795–1821)</li>
            <li>Sylvia Plath (1932–1963)</li>
            <li>William Blake (1757–1827)</li>
          </ol>

          <PageImage
            src="https://res.cloudinary.com/dmiizmobu/image/upload/c_scale,w_500/v1669794746/openai-beauty/DALL_E_2022-11-30_08.49.24_-_digital_art_william_shakespear_opt.png"
            altText="William Shakespeare"
          />

          {/* CTA Button to Poems */}
          <CTAReadPoemsButton />

          <Blockquote cite="– Google">
            Poetry is beautiful because it is a way to express emotions and
            experiences through words.
          </Blockquote>

          <p>
            Poetry is beautiful because it is a way to express emotions and
            experiences through words. It is often a very personal and intimate
            form of art, and it can be a powerful form of storytelling. The way
            it is written can be very captivating, with its use of vivid imagery
            and poetic language. At its best, poetry can evoke powerful emotions
            and touch the human heart.
          </p>
        </Box>
      </Layout>
    </UserProvider>
  );
}
