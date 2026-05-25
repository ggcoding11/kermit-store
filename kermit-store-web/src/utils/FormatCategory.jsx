export const formatCategory = (category) => {
  return category
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
};
