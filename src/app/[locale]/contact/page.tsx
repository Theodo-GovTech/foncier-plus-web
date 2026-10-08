import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "ContactPage.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const ContactPage = async () => {
  const t = await getTranslations("ContactPage");

  return (
    <main className="flex-1 bg-linear-to-b from-brand/2 to-white">
      <Breadcrumb currentPage={t("title")} />
      <div className="mx-auto max-w-page px-4  lg:px-[114px]">
        <div className="bg-white p-5">
          <h1 className="text-4xl text-brand lg:text-[40px] lg:leading-[46px]">
            {t.rich("heading", {
              bold: (chunks) => <span className="font-bold">{chunks}</span>,
              line: (chunks) => <span className="block">{chunks}</span>,
            })}
          </h1>
          <p className="mt-6 text-brand">{t("subHeading")}</p>
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-brand lg:text-[28px] lg:leading-[36px]">
              {t("contactForm.heading")}
            </h2>
            <p className="mt-3 text-muted">{t("contactForm.description")}</p>
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
