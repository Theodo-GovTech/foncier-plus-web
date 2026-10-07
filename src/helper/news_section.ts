import { dirname } from "node:path";
import type { Locale } from "next-intl";
import {
  getArticlePages,
  NEWS_SECTION_DIRECTORY,
  readNewsFiles,
} from "@/helper/article_pages";
import { compareDates } from "@/helper/date";
import { checkPublicFileExists, PUBLIC_DIRECTORY } from "@/helper/public_files";
import {
  convertFileIntoNewsMd,
  type News,
  NewsType,
} from "@/helper/read_news_md";

type NewsWithLink = News & { linkToNews: string };

export type NewsSectionItem = NewsWithLink & {
  href: string;
  coverImgSrc: string;
};

const getNewsHref = (news: NewsWithLink, assetsPath: string): string => {
  if (news.type === NewsType.ARTICLE) return `/${news.slug}`;
  if (news.type === NewsType.PDF) return `${assetsPath}/${news.body}`;
  return news.body;
};

export const getNewsSectionItems = (
  locale: Locale,
  directory: string = NEWS_SECTION_DIRECTORY,
  publicDirectory: string = PUBLIC_DIRECTORY,
): NewsSectionItem[] => {
  const frArticleSlugs = new Map(
    getArticlePages("fr", [directory]).map(({ articleDirectory, slug }) => [
      articleDirectory,
      slug,
    ]),
  );

  const getAssetsPath = ({ type, slug, linkToNews }: NewsWithLink): string => {
    if (type !== NewsType.ARTICLE) return `/${slug}`;

    const articleDirectory = dirname(linkToNews);
    const frSlug = frArticleSlugs.get(articleDirectory);

    if (frSlug === undefined) {
      throw new Error(`${articleDirectory} - Missing "fr" article`);
    }

    return `/${frSlug}`;
  };

  return readNewsFiles([directory])
    .filter((newsFile) => newsFile.locale === locale)
    .map(({ linkToNews }) => ({
      ...convertFileIntoNewsMd(linkToNews),
      linkToNews,
    }))
    .sort(
      (a, b) =>
        compareDates(b.date, a.date) || a.title.localeCompare(b.title, locale),
    )
    .map((news) => {
      const assetsPath = getAssetsPath(news);
      const href = getNewsHref(news, assetsPath);
      const coverImgSrc = `${assetsPath}/${news.coverImgPath}`;

      checkPublicFileExists(coverImgSrc, news.linkToNews, publicDirectory);

      if (news.type === NewsType.PDF) {
        checkPublicFileExists(href, news.linkToNews, publicDirectory);
      }

      return {
        ...news,
        href,
        coverImgSrc,
      };
    });
};
