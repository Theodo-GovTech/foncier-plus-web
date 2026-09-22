import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SearchSection } from "@/components/SearchSection";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="flex-1">
      {t("title")}
      <SearchSection />
      <nav className="flex gap-4 text-sm text-zinc-500">
        {routing.locales.map((locale) => (
          <Link key={locale} href="/" locale={locale}>
            {locale.toUpperCase()}
          </Link>
        ))}
      </nav>
    </main>
  );
}
