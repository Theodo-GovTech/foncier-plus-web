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

  it("throws when the slug of an article is missing", () => {
    expect(() => convertFileIntoNewsMd(testNews("missing-slug.md"))).toThrow(
      'Missing metadata "slug"',
    );
  });

  it.each(["pdf", "url"])("does not require a slug for a %s", (type) => {
    expect(
      convertFileIntoNewsMd(testNews(`${type}-without-slug.md`)).slug,
    ).toBeUndefined();
  });

  it("returns the slug of a non-article when it is provided", () => {
    expect(convertFileIntoNewsMd(testNews("pdf-with-slug.md")).slug).toBe(
      "/pdf",
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
