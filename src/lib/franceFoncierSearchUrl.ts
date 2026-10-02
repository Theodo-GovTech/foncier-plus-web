import type { Region } from "@/data/regions";

const FRANCE_FONCIER_SEARCH_URL =
  "https://www.banquedesterritoires.fr/produits-services/services-digitaux/france-foncier#/fo4-bdt-wc-foncier/rechercher";

const toLatin1Base64 = (value: string) => {
  const bytes = Array.from(value, (char) => char.charCodeAt(0));
  return btoa(String.fromCharCode(...bytes));
};

export const buildFranceFoncierRegionSearchUrl = (region: Region) => {
  const query = {
    departements: [],
    regions: [
      {
        type: "REGION",
        code: region.inseeCode,
        libelle: region.libelle,
      },
    ],
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

  return `${FRANCE_FONCIER_SEARCH_URL}?q=${toLatin1Base64(JSON.stringify(query))}`;
};
