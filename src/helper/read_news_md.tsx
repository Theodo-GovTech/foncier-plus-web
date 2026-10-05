import { readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { readMetadata, readRequiredMetadata } from "@/helper/frontmatter";

// Type PDF is used only for local pdf file, link to pdf files are URL
export enum NewsType {
  ARTICLE = "article",
  PDF = "pdf",
  URL = "url",
}

export type News = {
  type: NewsType;
  title: string;
  description?: string;
  metaDescription?: string;
  coverImgPath?: string | null;
  slug?: string;
  body: string;
};

const isNewsType = (value: string): value is NewsType =>
  Object.values<string>(NewsType).includes(value);

// Leading and trailing "/" are optional. Only ASCII letters, digits, "-" and "_"
const normalizeSlug = (slug: string, linkToNews: string): string => {
  const leadingOrTrailingSlash = /^\/|\/$/g;
  const onlyAlphanumDashUnderscore = /^[\w-]+$/;

  const normalizedSlug = slug.replace(leadingOrTrailingSlash, "");

  if (!onlyAlphanumDashUnderscore.test(normalizedSlug)) {
    throw new Error(`${linkToNews} - Invalid slug "${slug}"`);
  }

  return normalizedSlug;
};

export const convertFileIntoNewsMd = (linkToNews: string): News => {
  const file = readFileSync(join(process.cwd(), linkToNews), "utf-8");
  const { data, content } = matter(file);

  const type = readRequiredMetadata(data, "type", linkToNews);

  const lowercaseType = type.toLowerCase();

  if (!isNewsType(lowercaseType)) {
    throw new Error(`${linkToNews} - Invalid news type "${lowercaseType}"`);
  }

  return {
    type: lowercaseType,
    title: readRequiredMetadata(data, "title", linkToNews),
    description: readMetadata(data, "description"),
    metaDescription: readMetadata(data, "meta-description"),
    coverImgPath: readMetadata(data, "cover_image"),
    slug:
      lowercaseType === NewsType.ARTICLE
        ? normalizeSlug(
            readRequiredMetadata(data, "slug", linkToNews),
            linkToNews,
          )
        : readMetadata(data, "slug"),
    body: content.trim(),
  };
};
