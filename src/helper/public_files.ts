import { existsSync } from "node:fs";
import { join } from "node:path";

export const PUBLIC_DIRECTORY = "public";

// /a-propos/ECO_454.svg -> public/a-propos/ECO_454.svg
export const checkPublicFileExists = (
  src: string,
  linkToNews: string,
  publicDirectory: string = PUBLIC_DIRECTORY,
) => {
  const publicFile = join(publicDirectory, src);

  if (!existsSync(join(process.cwd(), publicFile))) {
    throw new Error(`${linkToNews} - Missing file "${publicFile}"`);
  }
};

// ![alt](/a-propos/ECO_454.svg). Images of another site are not checked
export const checkMarkdownImagesExist = (
  markdown: string,
  linkToNews: string,
) =>
  [...markdown.matchAll(/!\[[^\]]*\]\(([^\s)]+)/g)]
    .map(([, src]) => src)
    .filter((src) => !URL.canParse(src))
    .forEach((src) => checkPublicFileExists(src, linkToNews));
