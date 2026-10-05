// Also imported by src/data/generate-locations.ts under plain `node`: keep this file free of
// imports and of non-erasable TypeScript syntax (enums, namespaces, parameter properties).
export const locationTypes = [
  "REGION",
  "DEPARTEMENT",
  "EPCI",
  "COMMUNE",
] as const;

export type LocationType = (typeof locationTypes)[number];

/** Shape expected by the France Foncier web component in its `regions`, `departements`, `epcis` and `communes` filters. */
export interface Location {
  type: LocationType;
  code: string;
  libelle: string;
}

export type LocationsFile = Record<
  LocationType,
  [code: string, libelle: string][]
>;

interface IndexedLocation extends Location {
  searchKey: string;
}

/** Generated from src/data/locations.csv by src/data/generate-locations.ts. */
const LOCATIONS_URL = "/locations.json";
const MIN_QUERY_LENGTH = 2;
const MAX_SUGGESTIONS = 20;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/œ/g, "oe")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

let locationsPromise: Promise<IndexedLocation[]> | null = null;

/** Fetched on demand only: the full mapping is ~1 MB and must not weigh on the initial page load. */
export const loadLocations = () => {
  locationsPromise ??= fetch(LOCATIONS_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load locations: ${response.status}`);
      }
      return response.json() as Promise<LocationsFile>;
    })
    .then((file) =>
      locationTypes.flatMap((type) =>
        file[type].map(([code, libelle]) => ({
          type,
          code,
          libelle,
          searchKey: normalize(libelle),
        })),
      ),
    )
    .catch((error) => {
      locationsPromise = null;
      throw error;
    });

  return locationsPromise;
};

const getMatchRank = (searchKey: string, query: string) => {
  if (searchKey.startsWith(query)) return 0;
  if (searchKey.includes(` ${query}`)) return 1;
  if (searchKey.includes(query)) return 2;
  return null;
};

export const searchLocations = (
  locations: IndexedLocation[],
  query: string,
): Location[] => {
  const normalizedQuery = normalize(query);
  if (normalizedQuery.length < MIN_QUERY_LENGTH) return [];

  return locations
    .flatMap((location) => {
      const rank = getMatchRank(location.searchKey, normalizedQuery);
      return rank === null ? [] : [{ location, rank }];
    })
    .sort(
      (a, b) =>
        a.rank - b.rank ||
        locationTypes.indexOf(a.location.type) -
          locationTypes.indexOf(b.location.type) ||
        a.location.libelle.localeCompare(b.location.libelle, "fr"),
    )
    .slice(0, MAX_SUGGESTIONS)
    .map(({ location: { type, code, libelle } }) => ({ type, code, libelle }));
};

/** Department code, used to tell apart the many communes sharing the same name. */
export const getDepartementCode = (location: Location) => {
  if (location.type === "DEPARTEMENT") return location.code;
  if (location.type === "COMMUNE") {
    return location.code.slice(0, location.code.startsWith("97") ? 3 : 2);
  }
  return null;
};
