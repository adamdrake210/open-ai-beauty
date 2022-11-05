import React from "react";
import { openaiApi } from "@/services/openaiApi";

async function getOpenAiText(prompt: string) {
  return await openaiApi(prompt);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
}

export default async function Page() {
  const inspiredText = await getOpenAiText("Say something inspiring");
  const birthdayText = await getOpenAiText(
    "Name one famous person who has their birthday today"
  );
  const historicalFactText = await getOpenAiText(
    "Write one interesting fact about 5th november from history"
  );

  return (
    <div>
      <h2>Inspiration</h2>
      <p>{inspiredText}</p>
      <h2>Historical Fact</h2>
      <p>{historicalFactText}</p>
      <h2>Birthday</h2>
      <p>{birthdayText} was born today.</p>
    </div>
  );
}
