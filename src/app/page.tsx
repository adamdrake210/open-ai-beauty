import React from "react";
import {
  openaiTextResponseApi,
  openaiImageResponseApi,
} from "@/services/openaiApi";
import Image from "next/image";

async function getOpenAiText(prompt: string) {
  return await openaiTextResponseApi(prompt);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
}

async function getOpenAiImage(prompt: string) {
  return await openaiImageResponseApi(prompt);
}

export default async function Page() {
  const date = new Date();

  const subject = "trees";

  const preamble =
    "Create a deep and meaningful poem that is no more than 100 words long. Finish at a full stop '.' The poem should be about the following topic: ";

  const inspiringTitle = await getOpenAiText(
    `Create an inspiring poem title about ${subject}, no more than 6 words`
  );

  const inspiredText = await getOpenAiText(`${preamble} ${subject}`);

  const image = await getOpenAiImage(
    `${inspiredText?.substring(0, 50)}, water color pencil drawing`
  );

  return (
    <div>
      <h2 className="text-3xl font-bold underline">{inspiringTitle}</h2>
      {image && (
        <Image
          src={image}
          alt={`Picture of ${inspiredText}`}
          width={500}
          height={500}
        />
      )}
      <p>{inspiredText}</p>
      <p>Posted: {date.toDateString()}</p>
    </div>
  );
}
