export const getRandomSelection = (array: string[]) => {
  return Math.floor(Math.random() * array.length);
};

export const convertToSlug = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};
