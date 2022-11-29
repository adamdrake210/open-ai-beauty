import React from "react";
import Head from "next/head";

import Layout from "@/layout/Layout";
import { SEOComponent } from "@/components/SEOComponent";
import { SITE_URL } from "@/constants/constants";
import { Poems } from "@/components/Poems";
import { LinkButton } from "@/components/common/buttons/LinkButton";
import { HOME } from "@/constants/routeConstants";

export default function WhatIsPoetry() {
  return (
    <>
      <Head>
        <title>What is Poetry?</title>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dmiizmobu/image/upload/c_scale,w_64/v1668858555/openai-beauty/DALL_E_2022-11-19_12.46.31_-_Make_a_favicon_representing_AI_being_creative_monkey_pixels_2.png"
        />
        <SEOComponent
          title="OpenAI GPT-3 Poems"
          description="Poetry is a type of literature that expresses ideas, emotions, and images through the use of rhythm, imagery, and word choice. This website is investigating the capabilities of GPT-3 and how it can be used to generate poetry."
          siteUrl={SITE_URL}
        />
      </Head>
      <Layout>
        <section className="p-2 max-w-lg mx-auto my-6 text-lg">
          <h1 className="my-4 font-cursive">What is Poetry</h1>
          <p>
            Poetry is a type of literature that expresses ideas, emotions, and
            images through the use of rhythm, imagery, and word choice. It is
            often written in a metrical pattern and can range from very
            structured and formal to free-flowing and personal. Poetry can be
            used to convey a single thought or emotion, or as a way to explore a
            subject in greater depth.
          </p>

          <h2>Different types of Poems</h2>
          <p>
            There are different types of poems which come from all types of
            different cultures.
          </p>
          <ol className="list-decimal pl-4">
            <li className="mb-2">
              <h3>Haiku</h3>A traditional Japanese form of poetry, usually
              consisting of three lines with five syllables in the first line,
              seven syllables in the second line, and five syllables in the
              third line.
            </li>

            <li className="mb-2">
              <h3>Limerick</h3> A five-line poem with a distinctive rhythm in
              which the first, second, and fifth lines rhyme, while the third
              and fourth lines rhyme with each other.
            </li>

            <li className="mb-2">
              <h3>Sonnet</h3> A fourteen-line poem usually written in iambic
              pentameter with a particular rhyme scheme of abab cdcd efef gg.
            </li>

            <li className="mb-2">
              <h3>Free Verse</h3> A type of poetry that does not follow any
              particular structure or rhyme scheme.
            </li>

            <li className="mb-2">
              <h3>Ballad</h3> A narrative poem with a repeated refrain and
              simple rhyme scheme.
            </li>

            <li className="mb-2">
              <h3>Ode</h3> A lyric poem that is written in a formal style to
              honor or praise a person, place, or event.
            </li>

            <li className="mb-2">
              <h3>Epic</h3> A lengthy narrative poem that tells a story of
              heroic deeds and events of great significance.
            </li>
          </ol>
          <div className="flex justify-center my-6">
            <LinkButton url={HOME} color="primary">
              Read Poetry by AI
            </LinkButton>
          </div>
        </section>
      </Layout>
    </>
  );
}
