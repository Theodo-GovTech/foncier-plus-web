export type Frontmatter = Record<string, unknown>;

export const readMetadata = (
  frontmatter: Frontmatter,
  key: string,
): string | undefined => {
  const value = frontmatter[key];
  const isString = typeof value === "string";

  if (!isString) return undefined;

  const strValue = value.trim();

  const isUndefined = strValue === "" || strValue === "NA";

  if (isUndefined) return undefined;

  return strValue;
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
