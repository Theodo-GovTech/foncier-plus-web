import type { Locale } from "next-intl";
import type { FranceFoncierQuery } from "@/lib/franceFoncierUrls";
import type { Location } from "@/lib/locations";

// Option lists follow the web component's own form order: it restores checkboxes from
// the query by index, so the order must not change.
export const acquisitionTypes = ["VENTE", "LOCATION"] as const;
export const offerTypes = ["NU", "BATI"] as const;
export const availabilities = [
  "IMMEDIATLY",
  "FROM_0_TO_6",
  "FROM_6_TO_12",
  "MORE_THAN_12",
] as const;
export const destinations = ["ART", "INDU", "LOG", "MIX"] as const;
export const surfaceUnits = ["ha", "m2"] as const;

export type AcquisitionType = (typeof acquisitionTypes)[number];
export type OfferType = (typeof offerTypes)[number];
export type Availability = (typeof availabilities)[number];
export type Destination = (typeof destinations)[number];
export type SurfaceUnit = (typeof surfaceUnits)[number];

export interface SearchFilters {
  location: Location | null;
  acquisitionTypes: AcquisitionType[];
  readyToUseSite: boolean;
  offerTypes: OfferType[];
  /** Raw input value, kept as typed so partial numbers like "1." stay editable. */
  surface: { value: string; unit: SurfaceUnit };
  availabilities: Availability[];
  destinations: Destination[];
}

export const defaultSearchFilters: SearchFilters = {
  location: null,
  acquisitionTypes: [],
  readyToUseSite: false,
  offerTypes: [],
  surface: { value: "", unit: "ha" },
  availabilities: [],
  destinations: [],
};

// The web component displays the labels it receives in the query, so they mirror its own translations.
const webComponentLabels: Record<
  Locale,
  Record<AcquisitionType | OfferType | Availability | Destination, string>
> = {
  fr: {
    VENTE: "Vente",
    LOCATION: "Location",
    NU: "Terrain nu",
    BATI: "Terrain bâti",
    IMMEDIATLY: "Immédiatement",
    FROM_0_TO_6: "0 à 6 mois",
    FROM_6_TO_12: "6 à 12 mois",
    MORE_THAN_12: "+12 mois",
    ART: "Artisanat",
    INDU: "Industrie",
    LOG: "Logistique",
    MIX: "Mixte",
  },
  en: {
    VENTE: "Sale",
    LOCATION: "Lease",
    NU: "Bare land",
    BATI: "Built land",
    IMMEDIATLY: "Immediately",
    FROM_0_TO_6: "0 to 6 months",
    FROM_6_TO_12: "6 to 12 months",
    MORE_THAN_12: "+12 months",
    ART: "Crafts",
    INDU: "Industry",
    LOG: "Logistics",
    MIX: "Mixed use",
  },
};

export const toggleValue = <T>(values: T[], value: T) =>
  values.includes(value)
    ? values.filter((current) => current !== value)
    : [...values, value];

const toCheckboxFilter = <T extends keyof (typeof webComponentLabels)[Locale]>(
  options: readonly T[],
  selected: T[],
  locale: Locale,
  { allMeansNone }: { allMeansNone: boolean },
) => {
  const isUnfiltered =
    selected.length === 0 ||
    (allMeansNone && selected.length === options.length);

  if (isUnfiltered) return [];

  return options.map((value) => ({
    label: webComponentLabels[locale][value],
    value,
    filtre: null,
    checked: selected.includes(value),
  }));
};

const toSurfaceFilters = ({ value, unit }: SearchFilters["surface"]) => {
  const minValue = Number.parseFloat(value);
  if (!(minValue > 0)) return {};

  return unit === "ha"
    ? {
        surface_terrain_dispo: [
          {
            label: "Surface Terrain Disponible",
            minValue,
            maxValue: null,
            unite: "ha",
          },
        ],
      }
    : {
        surface_bati: [
          {
            label: "Surface Terrain bâti",
            minValue,
            maxValue: null,
            unite: "m²",
          },
        ],
      };
};

const toLocationFilters = (location: Location | null) => {
  if (!location) return {};

  const filterKeyByType = {
    REGION: "regions",
    DEPARTEMENT: "departements",
    EPCI: "epcis",
    COMMUNE: "communes",
  } as const;

  return { [filterKeyByType[location.type]]: [location] };
};

export const toFranceFoncierQuery = (
  filters: SearchFilters,
  locale: Locale,
): Partial<FranceFoncierQuery> => ({
  ...toLocationFilters(filters.location),
  // Both acquisition types selected is the same as no filter.
  typeAcquisition: toCheckboxFilter(
    acquisitionTypes,
    filters.acquisitionTypes,
    locale,
    { allMeansNone: true },
  ),
  typologie: toCheckboxFilter(offerTypes, filters.offerTypes, locale, {
    allMeansNone: false,
  }),
  disponibilite: toCheckboxFilter(
    availabilities,
    filters.availabilities,
    locale,
    { allMeansNone: true },
  ),
  destination: toCheckboxFilter(destinations, filters.destinations, locale, {
    allMeansNone: true,
  }),
  scm: filters.readyToUseSite ? true : null,
  ...toSurfaceFilters(filters.surface),
});
