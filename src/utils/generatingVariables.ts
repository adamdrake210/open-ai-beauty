import { getRandomSelection } from "./utils";

export const determineImageGenre = () => {
  const genres = [
    "water color pencil drawing",
    "digital art",
    "3D render",
    "van gogh style painting",
    "abstract painting",
    "futuristic painting",
    "landscape painting",
    "portrait painting",
    "still life painting",
    "street art",
    "pop art",
    "graffiti",
    "sketch",
    "illustration",
    "comic",
    "cartoon",
    "anime",
    "manga",
    "photography",
    "sculpture",
  ];

  const randomIndex = getRandomSelection(genres);

  return genres[randomIndex];
};

export const determinePoetInspiration = () => {
  const poets = [
    "William Shakespeare",
    "Emily Dickinson",
    "Robert Frost",
    "Edgar Allan Poe",
    "Walt Whitman",
  ];

  const randomIndex = getRandomSelection(poets);

  return poets[randomIndex];
};

export const determinePoemStyle = () => {
  const poemTypes = [
    "sonnet",
    "ballad",
    "limerick",
    "haiku",
    "couplet",
    "rhyming couplet",
    "sapphic stanza",
    "villanelle",
    "free verse",
    "quatrain",
  ];

  const randomIndex = getRandomSelection(poemTypes);

  return poemTypes[randomIndex];
};
