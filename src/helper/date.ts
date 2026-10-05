import { type Frontmatter, readMetadata } from "@/helper/frontmatter";

// new Date("2025-02-31") silently moves to March 3rd
const isValidDate = (date: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(date) &&
  !Number.isNaN(Date.parse(date)) &&
  new Date(date).toISOString().startsWith(date);

// Format : YYYY-MM-DD. YAML reads it as a Date when it is not quoted
export const readDate = (
  frontmatter: Frontmatter,
  linkToNews: string,
): string | undefined => {
  const value = frontmatter.date;
  const date =
    value instanceof Date
      ? value.toISOString().slice(0, 10)
      : readMetadata(frontmatter, "date");

  if (date !== undefined && !isValidDate(date)) {
    throw new Error(`${linkToNews} - Invalid date "${date}"`);
  }

  return date;
};
