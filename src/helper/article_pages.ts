import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { hasLocale, type Locale } from "next-intl";
import {
  convertFileIntoArticleMd,
  type newsMd,
  typeNews,
} from "@/helper/read_news_md";
import { routing } from "@/i18n/routing";

export const ARTICLE_DIRECTORIES = ["src/assets/a-propos"];
const LOCALE_PAGES_DIRECTORY = "src/app/[locale]";

type ArticleFile = {
  linkToArticle: string;
  locale: Locale;
};

export type ArticlePage = newsMd & { slug: string; articleDirectory: string };

// Format : <article_name>_[A-Z]+.md
export const getLocaleFromFileName = (linkToArticle: string): Locale => {
  const locale = linkToArticle.match(/([A-Z]+)\.md$/)?.[1].toLowerCase();

  if (!hasLocale(routing.locales, locale)) {
    throw new Error(
      `${linkToArticle} - Missing language suffix (${routing.locales.join(", ").toUpperCase()})`,
    );
  }

  return locale;
};

export const readArticleFiles = (directories: string[]): ArticleFile[] => {
  return directories.flatMap((directory) =>
    readdirSync(join(process.cwd(), directory), {
      recursive: true,
      encoding: "utf-8",
    })
      .filter((path) => path.endsWith(".md"))
      .sort()
      .map((path) => {
        const linkToArticle = join(directory, path);

        return {
          linkToArticle,
          locale: getLocaleFromFileName(linkToArticle),
        };
      }),
  );
};

const getStaticRouteSlugs = (): string[] => {
  return readdirSync(join(process.cwd(), LOCALE_PAGES_DIRECTORY), {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory() && !/^[[(_]/.test(entry.name))
    .map(({ name }) => name);
};

export const getArticlePages = (
  locale: Locale,
  directories: string[] = ARTICLE_DIRECTORIES,
): ArticlePage[] => {
  const linkToArticleBySlug = new Map<string, string>();
  const staticRouteSlugs = getStaticRouteSlugs();
  const articleDirectories = new Set<string>();

  const checkSlugIsFree = (slug: string, linkToArticle: string) => {
    if (staticRouteSlugs.includes(slug)) {
      throw new Error(`${linkToArticle} - Slug "${slug}" already used`);
    }

    const otherLinkToArticle = linkToArticleBySlug.get(slug);

    if (otherLinkToArticle !== undefined) {
      throw new Error(`${linkToArticle} - Slug "${slug}" already used`);
    }

    linkToArticleBySlug.set(slug, linkToArticle);
  };

  return (
    readArticleFiles(directories)
      .filter((articleFile) => articleFile.locale === locale)
      .flatMap(({ linkToArticle }) => {
        const article = convertFileIntoArticleMd(linkToArticle);
        const articleDirectory = dirname(linkToArticle);

        if (article.type !== typeNews.ARTICLE || article.slug === undefined) {
          return [];
        }

        checkSlugIsFree(article.slug, linkToArticle);

        if (articleDirectories.has(articleDirectory)) {
          throw new Error(
            `${linkToArticle} - Language "${locale}" already used`,
          );
        }

        articleDirectories.add(articleDirectory);

        return [{ ...article, slug: article.slug, articleDirectory }];
      })
  );
};

type ArticleRedirect = {
  slug: string;
  destination: { href: string; locale: Locale };
};

// /fr/<slug-en> -> /fr/<slug-fr>
export const getArticleRedirects = (
  locale: Locale,
  directories: string[] = ARTICLE_DIRECTORIES,
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
