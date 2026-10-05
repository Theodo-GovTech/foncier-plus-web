import { describe, expect, it } from "vitest";
import { convertFileIntoNewsMd } from "@/helper/read_news_md";

const testNews = (name: string) => `__tests__/test_news/${name}`;

describe("convertFileIntoNewsMd", () => {
  it("returns the article metadata and its trimmed content", () => {
    expect(convertFileIntoNewsMd(testNews("complete-article.md"))).toEqual({
      type: "article",
      title: "Article title",
      description: "Article description",
      metaDescription: "Article meta description",
      coverImgPath: "cover.png",
      slug: "article",
      date: "2025-10-01",
      body: "# Article heading\n\nArticle body.",
    });
  });

  it("removes the leading and trailing slash of an article slug", () => {
    expect(convertFileIntoNewsMd(testNews("trailing-slash-slug.md")).slug).toBe(
      "article",
    );
  });

  it.each([
    ["composite-slug.md", "/parent/article"],
    ["accented-slug.md", "/actualités"],
  ])("throws when the slug of %s is invalid", (fileName, slug) => {
    expect(() => convertFileIntoNewsMd(testNews(fileName))).toThrow(
      `Invalid slug "${slug}"`,
    );
  });

  it("returns undefined for optional metadata that is NA, empty or missing", () => {
    const article = convertFileIntoNewsMd(
      testNews("empty-optional-metadata.md"),
    );

    expect(article.description).toBeUndefined();
    expect(article.metaDescription).toBeUndefined();
    expect(article.coverImgPath).toBeUndefined();
    expect(article.date).toBeUndefined();
  });

  it("reads a date written without quotes", () => {
    expect(convertFileIntoNewsMd(testNews("unquoted-date.md")).date).toBe(
      "2025-10-01",
    );
  });

  it("throws when the type is missing", () => {
    expect(() => convertFileIntoNewsMd(testNews("missing-type.md"))).toThrow(
      'Missing metadata "type"',
    );
  });

  it("throws when the title is missing", () => {
    expect(() => convertFileIntoNewsMd(testNews("missing-title.md"))).toThrow(
      'Missing metadata "title"',
    );
  });

  it("throws when the title only contains spaces", () => {
    expect(() => convertFileIntoNewsMd(testNews("blank-title.md"))).toThrow(
      'Missing metadata "title"',
    );
  });

  it.each(["missing-slug.md", "pdf-without-slug.md", "url-without-slug.md"])(
    "throws when the slug of %s is missing",
    (fileName) => {
      expect(() => convertFileIntoNewsMd(testNews(fileName))).toThrow(
        'Missing metadata "slug"',
      );
    },
  );

  it("removes the leading slash of a non-article slug", () => {
    expect(convertFileIntoNewsMd(testNews("pdf-with-slug.md")).slug).toBe(
      "pdf",
    );
  });

  it("accepts an article type written in uppercase", () => {
    expect(
      convertFileIntoNewsMd(testNews("uppercase-article.md")),
    ).toMatchObject({ type: "article", slug: "article" });
  });

  it("throws when the type is not supported", () => {
    expect(() => convertFileIntoNewsMd(testNews("invalid-type.md"))).toThrow(
      'Invalid news type "video"',
    );
  });
});
