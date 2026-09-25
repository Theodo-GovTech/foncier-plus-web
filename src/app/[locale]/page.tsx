import { getTranslations } from "next-intl/server";
import { SearchSection } from "@/components/SearchSection";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="flex-1">
      <SearchSection />
    </main>
  );
}
