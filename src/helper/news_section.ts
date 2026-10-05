import { dirname } from "node:path";
import type { Locale } from "next-intl";
import {
  getArticlePages,
  NEWS_SECTION_DIRECTORY,
  readNewsFiles,
} from "@/helper/article_pages";
import { compareDates } from "@/helper/date";
import {
  convertFileIntoNewsMd,
  type News,
  NewsType,
} from "@/helper/read_news_md";

type DatedNews = News & { linkToNews: string; date: string };

export type NewsSectionItem = DatedNews & {
  href: string;
  coverImgSrc?: string;
};

const readDatedNews = (linkToNews: string): DatedNews => {
  const news = convertFileIntoNewsMd(linkToNews);

  if (news.date === undefined) {
    throw new Error(`${linkToNews} - Missing metadata "date"`);
  }

  return { ...news, date: news.date, linkToNews };
};

const getNewsHref = (news: DatedNews, assetsPath: string): string => {
  if (news.type === NewsType.ARTICLE) return `/${news.slug}`;
  if (news.type === NewsType.PDF) return `${assetsPath}/${news.body}`;
  return news.body;
};

export const getNewsSectionItems = (
  locale: Locale,
  directory: string = NEWS_SECTION_DIRECTORY,
): NewsSectionItem[] => {
  // The files of an article are in public/<fr slug>/ whatever the language
  const frArticleSlugs = new Map(
    getArticlePages("fr", [directory]).map(({ articleDirectory, slug }) => [
      articleDirectory,
      slug,
    ]),
  );

  const getAssetsPath = ({ type, slug, linkToNews }: DatedNews): string => {
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
    .map(({ linkToNews }) => readDatedNews(linkToNews))
    .sort(
      (a, b) =>
        compareDates(b.date, a.date) || a.title.localeCompare(b.title, locale),
    )
    .map((news) => {
      const assetsPath = getAssetsPath(news);

      return {
        ...news,
        href: getNewsHref(news, assetsPath),
        coverImgSrc: news.coverImgPath
          ? `${assetsPath}/${news.coverImgPath}`
          : undefined,
      };
    });
};
