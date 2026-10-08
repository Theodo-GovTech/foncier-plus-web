import type { Locale } from "next-intl";
import { type Frontmatter, readRequiredMetadata } from "@/helper/frontmatter";

// new Date("2025-02-31") silently moves to March 3rd
const isValidDate = (date: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

  const parsedDate = new Date(date);
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date
  );
};

// Format : YYYY-MM-DD. YAML reads it as a Date when it is not quoted
export const readDate = (
  frontmatter: Frontmatter,
  linkToNews: string,
): string => {
  const value = frontmatter.date;
  const date =
    value instanceof Date
      ? value.toISOString().slice(0, 10)
      : readRequiredMetadata(frontmatter, "date", linkToNews);

  if (!isValidDate(date)) {
    throw new Error(`${linkToNews} - Invalid date "${date}"`);
  }

  return date;
};

export const compareDates = (a: string, b: string) => a.localeCompare(b);

export const formatDate = (date: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date));
