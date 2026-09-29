import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/Breadcrumb";

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <main className="flex-1 bg-linear-to-b from-brand/2 to-white">
      <Breadcrumb currentPage={t("title")} />
    </main>
  );
}
