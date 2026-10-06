import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { hasLocale, type Locale } from "next-intl";
import {
  convertFileIntoNewsMd,
  type News,
  NewsType,
} from "@/helper/read_news_md";
import { routing } from "@/i18n/routing";

export const ABOUT_US_DIRECTORY = "src/assets/news/a-propos";
export const NEWS_SECTION_DIRECTORY = "src/assets/news";
export const NEWS_DIRECTORIES = [NEWS_SECTION_DIRECTORY];
const LOCALE_PAGES_DIRECTORY = "src/app/[locale]";

type NewsFile = {
  linkToNews: string;
  locale: Locale;
};

export type ArticlePage = News & { articleDirectory: string };

// Format : <article_name>_[A-Z]+.md
export const getLocaleFromFileName = (linkToNews: string): Locale => {
  const locale = linkToNews.match(/([A-Z]+)\.md$/)?.[1].toLowerCase();

  if (!hasLocale(routing.locales, locale)) {
    throw new Error(
      `${linkToNews} - Missing language suffix (${routing.locales.join(", ").toUpperCase()})`,
    );
  }

  return locale;
};

export const readNewsFiles = (directories: string[]): NewsFile[] =>
  directories.flatMap((directory) =>
    readdirSync(join(process.cwd(), directory), {
      recursive: true,
      encoding: "utf-8",
    })
      .filter((path) => path.endsWith(".md"))
      .sort()
      .map((path) => {
        const linkToNews = join(directory, path);

        return {
          linkToNews,
          locale: getLocaleFromFileName(linkToNews),
        };
      }),
  );

const getStaticRouteSlugs = (): string[] =>
  readdirSync(join(process.cwd(), LOCALE_PAGES_DIRECTORY), {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory() && !/^[[(_]/.test(entry.name))
    .map(({ name }) => name);

export const getArticlePages = (
  locale: Locale,
  directories: string[] = NEWS_DIRECTORIES,
): ArticlePage[] => {
  const usedSlugs = new Set(getStaticRouteSlugs());
  const articleDirectories = new Set<string>();

  const checkSlugIsFree = (slug: string, linkToNews: string) => {
    if (usedSlugs.has(slug)) {
      throw new Error(`${linkToNews} - Slug "${slug}" already used`);
    }

    usedSlugs.add(slug);
  };

  return readNewsFiles(directories)
    .filter((newsFile) => newsFile.locale === locale)
    .flatMap(({ linkToNews }) => {
      const article = convertFileIntoNewsMd(linkToNews);
      const articleDirectory = dirname(linkToNews);

      if (article.type !== NewsType.ARTICLE) return [];

      checkSlugIsFree(article.slug, linkToNews);

      if (articleDirectories.has(articleDirectory)) {
        throw new Error(`${linkToNews} - Language "${locale}" already used`);
      }

      articleDirectories.add(articleDirectory);

      return [{ ...article, articleDirectory }];
    });
};

type ArticleRedirect = {
  slug: string;
  destination: { href: string; locale: Locale };
};

// /fr/<slug-en> -> /fr/<slug-fr>
export const getArticleRedirects = (
  locale: Locale,
  directories: string[] = NEWS_DIRECTORIES,
): ArticleRedirect[] => {
  const articlePages = getArticlePages(locale, directories);
  const usedSlugs = new Set(articlePages.map(({ slug }) => slug));

  return routing.locales
    .filter((otherLocale) => otherLocale !== locale)
    .flatMap((otherLocale) =>
      getArticlePages(otherLocale, directories).flatMap(
        ({ slug, articleDirectory }) => {
          if (usedSlugs.has(slug)) return [];

          usedSlugs.add(slug);

          const translation = articlePages.find(
            (articlePage) => articlePage.articleDirectory === articleDirectory,
          );

          return [
            {
              slug,
              destination:
                translation === undefined
                  ? { href: `/${slug}`, locale: otherLocale }
                  : { href: `/${translation.slug}`, locale },
            },
          ];
        },
      ),
    );
};

// src/assets/news/a-propos -> /a-propos in fr, /about-us in en
export const getArticleHref = (
  locale: Locale,
  articleDirectory: string,
  directories: string[] = NEWS_DIRECTORIES,
): string => {
  const articlePage = getArticlePages(locale, directories).find(
    (articlePage) => articlePage.articleDirectory === articleDirectory,
  );

  if (articlePage === undefined) {
    throw new Error(`${articleDirectory} - Missing "${locale}" article`);
  }

  return `/${articlePage.slug}`;
};
