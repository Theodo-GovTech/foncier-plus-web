export type Frontmatter = Record<string, unknown>;

export const readMetadata = (
  frontmatter: Frontmatter,
  key: string,
): string | undefined => {
  const value = frontmatter[key];
  const isString = typeof value === "string";

  if (!isString) return undefined;

  const strValue: string = value.trim();

  return strValue !== "" && strValue !== "NA" ? strValue : undefined;
};

export const readRequiredMetadata = (
  frontmatter: Frontmatter,
  key: string,
  linkToNews: string,
): string => {
  const value = readMetadata(frontmatter, key);

  if (value !== undefined) return String(value);
  else throw new Error(`${linkToNews} - Missing metadata "${key}"`);
};
