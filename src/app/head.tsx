import { SITE_URL } from "@/constants/constants";
import { NextSeo } from "next-seo";

export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Poems By AI</title>
      <NextSeo
        title="OpenAI GPT-3 Poems"
        description="Poems generated by OpenAI's GPT-3 language model. This website is investigating the capabilities of GPT-3 and how it can be used to generate poetry."
        canonical={SITE_URL}
      />
    </>
  );
}
