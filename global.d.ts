import type { routing } from "@/i18n/routing";

// Types `useLocale()`, `Locale`, `getTranslations({ locale })`... with the locales of the site
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
  }
}
