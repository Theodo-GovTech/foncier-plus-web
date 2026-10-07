import { describe, expect, it } from "vitest";
import { getNewsSectionItems } from "@/helper/news_section";

// url: the most recent, pdf and article: same date, article: FR + EN
const NEWS_DIRECTORY = "__tests__/test_news_section";
const INVALID = "__tests__/test_news_section_invalid";

describe("getNewsSectionItems", () => {
  it("sorts the news from the most recent, then by title", () => {
    expect(
      getNewsSectionItems("fr", NEWS_DIRECTORY).map(({ title }) => title),
    ).toEqual(["Zeta", "Alpha", "Beta"]);
  });

  it("links an article to its page, its files being in the folder of its fr slug", () => {
    expect(getNewsSectionItems("en", NEWS_DIRECTORY)).toMatchObject([
      { href: "/article-en", coverImgSrc: "/article-fr/cover.png" },
    ]);
  });

  it("links a pdf to its file, in the folder of its slug", () => {
    expect(getNewsSectionItems("fr", NEWS_DIRECTORY)[1]).toMatchObject({
      href: "/pdf/document.pdf",
      coverImgSrc: "/pdf/cover.png",
    });
  });

  it("links a url news to its url, its cover being in the folder of its slug", () => {
    const [urlNews] = getNewsSectionItems("fr", NEWS_DIRECTORY);

    expect(urlNews.href).toBe("https://example.com");
    expect(urlNews.coverImgSrc).toBe("/url/cover.png");
  });

  it.each([
    ["missing-date", 'Missing metadata "date"'],
    ["untranslated-article", 'Missing "fr" article'],
  ])("throws for %s", (directory, message) => {
    expect(() => getNewsSectionItems("en", `${INVALID}/${directory}`)).toThrow(
      message,
    );
  });
});
