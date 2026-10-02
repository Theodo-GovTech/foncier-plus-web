import { readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

// Type PDF is used only for local pdf file, link to pdf files are URL
export enum typeNews {
  ARTICLE = "article",
  PDF = "pdf",
  URL = "url",
}

export type newsMd = {
  type: typeNews;
  title: string;
  description?: string;
  metaDescription?: string;
  coverImgPath?: string | null;
  slug?: string;
  body: string;
};

// To read md file
type Frontmatter = Record<string, unknown>;

const readMetadata = (
  frontmatter: Frontmatter,
  key: string,
): string | undefined => {
  const value = frontmatter[key];
  const isString = typeof value === "string";

  if (!isString) return undefined;

  const strValue: string = String(value).trim();

  return strValue !== "" && strValue !== "NA" ? strValue : undefined;
};

const readRequiredMetadata = (
  frontmatter: Frontmatter,
  key: string,
  linkToArticle: string,
): string => {
  const value = readMetadata(frontmatter, key);

  if (value !== undefined) return String(value);
  else throw new Error(`${linkToArticle} - Missing metadata "${key}"`);
};

const isTypeArticle = (value: string) =>
  Object.values<string>(typeNews).includes(value.toLowerCase());

// Leading and trailing "/" are optional. Only ASCII letters, digits, "-" and "_"
const normalizeSlug = (slug: string, linkToArticle: string): string => {
  const normalizedSlug = slug.replace(/^\/|\/$/g, "");

  if (!/^[\w-]+$/.test(normalizedSlug)) {
    throw new Error(`${linkToArticle} - Invalid slug "${slug}"`);
  }

  return normalizedSlug;
};

export const convertFileIntoArticleMd = (linkToArticle: string): newsMd => {
  const file = readFileSync(join(process.cwd(), linkToArticle), "utf-8");
  const { data, content } = matter(file);

  const type = readRequiredMetadata(data, "type", linkToArticle);

  if (!isTypeArticle(type)) {
    throw new Error(`${linkToArticle} - Invalid article type "${type}"`);
  }

  const verifiedType = type.toLowerCase() as typeNews;

  return {
    type: verifiedType,
    title: readRequiredMetadata(data, "title", linkToArticle),
    description: readMetadata(data, "description"),
    metaDescription: readMetadata(data, "meta-description"),
    coverImgPath: readMetadata(data, "cover_image"),
    slug:
      verifiedType === typeNews.ARTICLE
        ? normalizeSlug(
            readRequiredMetadata(data, "slug", linkToArticle),
            linkToArticle,
          )
        : readMetadata(data, "slug"),
    body: content.trim(),
  };
};
