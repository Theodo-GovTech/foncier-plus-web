// Converts the location mapping provided by the BdT (src/data/locations.csv) into the
// compact JSON lazily fetched by the search box. Runs before `pnpm dev` and `pnpm build`:
// to update the locations, replace the CSV.
import { readFileSync, writeFileSync } from "node:fs";
// This file is run by plain `node` which cannot use the `@/` alias or extensionless imports, so we use relative paths with extensions instead.
// eslint-disable-next-line no-restricted-imports
import { type LocationType, locationTypes } from "../lib/locations.ts";

const CSV_PATH = new URL("./locations.csv", import.meta.url);
const OUTPUT_PATH = new URL("../../public/locations.json", import.meta.url);

const isLocationType = (value: string): value is LocationType =>
  locationTypes.some((type) => type === value);

const parseCsvLine = (line: string) => {
  const fields: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index++) {
    const char = line[index];
    if (inQuotes && char === '"' && line[index + 1] === '"') {
      // Escaped quote inside a quoted field: must be checked before the quote toggle below.
      field += '"';
      index++;
    } else if (char === '"') {
      // Opening or closing quote of a quoted field.
      inQuotes = !inQuotes;
    } else if (!inQuotes && char === ",") {
      // Separator outside quotes: ends the current field.
      fields.push(field);
      field = "";
    } else {
      // Any other character, including commas inside quotes, belongs to the field.
      field += char;
    }
  }
  fields.push(field);
  return fields;
};

const [header, ...rows] = readFileSync(CSV_PATH, "utf8")
  // Remove BOM if present from the CSV file, which can happen if the file was created on Windows with certain editors
  .replace(/^\uFEFF/, "")
  // Split the CSV into lines, handling both Unix and Windows line endings
  .split(/\r?\n/)
  // filter out any empty lines
  .filter(Boolean);

if (header !== "type,code,libelle") {
  throw new Error(`Unexpected CSV header: ${header}`);
}

const locationsByType = Object.fromEntries(
  locationTypes.map((type) => [type, [] as [code: string, libelle: string][]]),
);

for (const row of rows) {
  const [type, code, libelle] = parseCsvLine(row);
  if (!isLocationType(type)) {
    throw new Error(`Unknown location type "${type}" in row: ${row}`);
  }
  locationsByType[type].push([code, libelle]);
}

writeFileSync(OUTPUT_PATH, JSON.stringify(locationsByType));

console.log(
  locationTypes
    .map((type) => `${type}: ${locationsByType[type].length}`)
    .join(", "),
);
