import type { Locale } from "next-intl";
import type { Region } from "@/data/regions";
import type { Location } from "@/lib/locations";

const FRANCE_FONCIER_URLS: Record<Locale, string> = {
  fr: "https://www.banquedesterritoires.fr/produits-services/services-digitaux/france-foncier",
  en: "https://www.banquedesterritoires.fr/france-foncier/en",
};

const SEARCH_ROUTE = "#/fo4-bdt-wc-foncier/rechercher";

export const getFranceFoncierUrl = (locale: Locale) =>
  FRANCE_FONCIER_URLS[locale];

interface CheckboxFilter {
  label: string;
  value: string;
  // Unused, but required for the web component
  filtre: null;
  checked: boolean;
}

interface SurfaceFilter {
  label: string;
  minValue: number | null;
  maxValue: number | null;
  unite: string;
}

// Filters state of the France Foncier web component
export interface FranceFoncierQuery {
  departements: Location[];
  regions: Location[];
  communes: Location[];
  epcis: Location[];
  typologie: CheckboxFilter[];
  typeAcquisition: CheckboxFilter[];
  disponibilite: CheckboxFilter[];
  destination: CheckboxFilter[];
  infrastructure_transport: CheckboxFilter[];
  ressources: CheckboxFilter[];
  zonage_afr: CheckboxFilter[];
  zonage_zrr: CheckboxFilter[];
  pole_competitivite: CheckboxFilter[];
  surface_bati: SurfaceFilter[] | null;
  surface_terrain_dispo: SurfaceFilter[] | null;
  nbre_terrain_dispo: SurfaceFilter[] | null;
  formation: unknown[];
  scm: boolean | null;
  zae: unknown[];
  updateDate: string;
  visibilite: CheckboxFilter[];
}

const emptyQuery: FranceFoncierQuery = {
  departements: [],
  regions: [],
  communes: [],
  epcis: [],
  typologie: [],
  typeAcquisition: [],
  disponibilite: [],
  destination: [],
  infrastructure_transport: [],
  ressources: [],
  zonage_afr: [],
  zonage_zrr: [],
  pole_competitivite: [],
  surface_bati: null,
  surface_terrain_dispo: null,
  nbre_terrain_dispo: null,
  formation: [],
  scm: null,
  zae: [],
  updateDate: "",
  visibilite: [],
};

// The web component decodes `q` with a bare `atob` + `JSON.parse`, so the payload must be
// Latin-1. Characters beyond it (e.g. "œ" in "CC Cœur de Sologne") are JSON-escaped, which
// `JSON.parse` restores.
const toLatin1Base64 = (value: string) =>
  btoa(
    value.replace(
      /[\u0100-\uffff]/g,
      (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
    ),
  );

export const buildFranceFoncierSearchUrl = (
  query: Partial<FranceFoncierQuery>,
  locale: Locale,
) => {
  const encodedQuery = toLatin1Base64(
    JSON.stringify({ ...emptyQuery, ...query }),
  );
  // URI-encoded so that a "+" in the Base64 output is not read back as a space.
  return `${FRANCE_FONCIER_URLS[locale]}${SEARCH_ROUTE}?q=${encodeURIComponent(encodedQuery)}`;
};

export const buildFranceFoncierRegionSearchUrl = (
  region: Region,
  locale: Locale,
) =>
  buildFranceFoncierSearchUrl(
    {
      regions: [
        { type: "REGION", code: region.inseeCode, libelle: region.libelle },
      ],
    },
    locale,
  );
