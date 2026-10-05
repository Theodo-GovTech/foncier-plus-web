import { describe, expect, it } from "vitest";
import {
  getArticlePages,
  getArticleRedirects,
  getLocaleFromFileName,
} from "@/helper/article_pages";

// about: FR + EN, shared: same slug in FR and EN, solo: FR only, pdf: not an article
const NEWS_DIRECTORIES = ["__tests__/test_news_directories"];
const INVALID = "__tests__/test_article_pages_invalid";

describe("getLocaleFromFileName", () => {
  it.each([
    ["About_FR.md", "fr"],
    ["coucou_COUCOCU_EN.md", "en"],
  ])("reads the locale of %s", (fileName, locale) => {
    expect(getLocaleFromFileName(fileName)).toBe(locale);
  });

  it.each(["About.md", "About_fr.md", "rapport_TOKEN.md"])(
    "throws when %s has no language suffix",
    (fileName) => {
      expect(() => getLocaleFromFileName(fileName)).toThrow(
        "Missing language suffix",
      );
    },
  );
});

describe("getArticlePages", () => {
  it("returns the articles of the locale, without the other news", () => {
    expect(
      getArticlePages("fr", NEWS_DIRECTORIES).map(({ slug }) => slug),
    ).toEqual(["a-propos", "shared", "solo"]);
  });

  it("returns the content of an article and its directory", () => {
    expect(getArticlePages("en", NEWS_DIRECTORIES)[0]).toMatchObject({
      title: "About",
      slug: "about-us",
      body: "# About",
      articleDirectory: "__tests__/test_news_directories/about",
    });
  });

  it.each([
    ["duplicated-slug", 'Slug "same" already used'],
    ["static-page-slug", 'Slug "contact" already used'],
    ["duplicated-language", 'Language "fr" already used'],
  ])("throws for %s", (directory, message) => {
    expect(() => getArticlePages("fr", [`${INVALID}/${directory}`])).toThrow(
      message,
    );
  });
});

describe("getArticleRedirects", () => {
  it("redirects to the translation, or to the article in its locale when untranslated", () => {
    expect(getArticleRedirects("en", NEWS_DIRECTORIES)).toEqual([
      { slug: "a-propos", destination: { href: "/about-us", locale: "en" } },
      { slug: "solo", destination: { href: "/solo", locale: "fr" } },
    ]);
  });

  it("does not redirect a slug shared by both languages", () => {
    expect(getArticleRedirects("fr", NEWS_DIRECTORIES)).toEqual([
      { slug: "about-us", destination: { href: "/a-propos", locale: "fr" } },
    ]);
  });
});
