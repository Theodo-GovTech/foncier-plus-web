import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/Breadcrumb";

const ContactPage = async () => {
  const t = await getTranslations("ContactPage");

  return (
    <main className="flex-1 bg-linear-to-b from-brand/2 to-white">
      <Breadcrumb currentPage={t("title")} />
    </main>
  );
};

export default ContactPage;
