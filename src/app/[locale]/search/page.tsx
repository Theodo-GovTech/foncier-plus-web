import { getLocale } from "next-intl/server";
import { buildWebComponentUrl } from "@/lib/franceFoncierUrls";

// The web component runs in an iframe: its Pollen stylesheet and Angular global styles
// would otherwise leak into our header and footer, and it can't live in a shadow
// root since it looks up its own elements with `document.getElementById`.
export default async function SearchPage({
  searchParams,
}: PageProps<"/[locale]/search">) {
  const locale = await getLocale();
  const { q } = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-page flex-1 flex-col px-4 pb-16 lg:px-[114px]">
      <iframe
        src={buildWebComponentUrl(
          locale,
          typeof q === "string" ? q : undefined,
        )}
        title="France Foncier"
        className="h-dvh w-full border-0"
      />
    </main>
  );
}
