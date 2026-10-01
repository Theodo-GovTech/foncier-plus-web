import { readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

enum typeArticle {
  ARTICLE = "article",
  PDF = "pdf",
  URL = "url",
}

type articleMd = {
  type: typeArticle;
  title: string;
  description?: string;
  metaDescription?: string;
  coverImgPath?: string | null;
  slug: string;
  text: string;
};

// To read md file
type Frontmatter = Record<string, unknown>;

const readMetadata = (frontmatter: Frontmatter, key: string): string | undefined => {
  const value = frontmatter[key];
  const isString = typeof value === "string";

  if (!isString)
    return undefined;

  const strValue: string = String(value).trim();

  return strValue !== "" && strValue !== "NA" ? strValue : undefined;
};

const readRequiredMetadata = (frontmatter: Frontmatter, key: string, linkToArticle: string): string => {
  const value = readMetadata(frontmatter, key);

  if (value !== undefined)
    return String(value);
  else
    throw new Error(`${linkToArticle} - Missing metadata "${key}"`);
}

const isTypeArticle = (value: string) => Object.values<string>(typeArticle).includes(value);


export const convertFileIntoArticleMd = (linkToArticle: string): articleMd => {
  const file = readFileSync(join(process.cwd(), linkToArticle), "utf-8");
  const { data, content } = matter(file);

  const type = readRequiredMetadata(data, "type", linkToArticle);

  if (!isTypeArticle(type)) {
    throw new Error(`${linkToArticle} - Invalid article type "${type}"`);
  }

  return {
    type: type as typeArticle,
    title: readRequiredMetadata(data, "title", linkToArticle),
    description: readMetadata(data, "description"),
    metaDescription: readMetadata(data, "meta-description"),
    coverImgPath: readMetadata(data, "cover_image"),
    slug: readRequiredMetadata(data, "slug", linkToArticle),
    text: content.trim(),
  };
};
