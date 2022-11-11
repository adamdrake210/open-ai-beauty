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

  const randomIndex = Math.floor(Math.random() * genres.length);

  return genres[randomIndex];
};
