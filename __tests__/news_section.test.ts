import type { Locale } from "next-intl";
import { describe, expect, it } from "vitest";
import { getNewsSectionItems } from "@/helper/news_section";

// url: the most recent, pdf and article: same date, article: FR + EN
const NEWS_DIRECTORY = "__tests__/test_news_section";
const INVALID = "__tests__/test_news_section_invalid";
// Cover images in the folder of the news slug (fr slug for an article)
const PUBLIC_DIRECTORY = "__tests__/test_public";

const getItems = (locale: Locale, directory = NEWS_DIRECTORY) =>
  getNewsSectionItems(locale, directory, PUBLIC_DIRECTORY);

describe("getNewsSectionItems", () => {
  it("sorts the news from the most recent, then by title", () => {
    expect(getItems("fr").map(({ title }) => title)).toEqual([
      "Zeta",
      "Alpha",
      "Beta",
    ]);
  });

  it("links an article to its page, its files being in the folder of its fr slug", () => {
    expect(getItems("en")).toMatchObject([
      { href: "/article-en", coverImgSrc: "/article-fr/cover.png" },
    ]);
  });

  it("links a pdf to its file, in the folder of its slug", () => {
    expect(getItems("fr")[1]).toMatchObject({
      href: "/pdf/document.pdf",
      coverImgSrc: "/pdf/cover.png",
    });
  });

  it("links a url news to its url, its cover being in the folder of its slug", () => {
    const [urlNews] = getItems("fr");

    expect(urlNews.href).toBe("https://example.com");
    expect(urlNews.coverImgSrc).toBe("/url/cover.png");
  });

  it.each([
    ["missing-date", 'Missing metadata "date"'],
    ["untranslated-article", 'Missing "fr" article'],
    [
      "nonexistent-cover-image",
      'Missing file "__tests__/test_public/url/nonexistent.png"',
    ],
    [
      "nonexistent-pdf",
      'Missing file "__tests__/test_public/pdf/nonexistent.pdf"',
    ],
  ])("throws for %s", (directory, message) => {
    expect(() => getItems("en", `${INVALID}/${directory}`)).toThrow(message);
  });
});
