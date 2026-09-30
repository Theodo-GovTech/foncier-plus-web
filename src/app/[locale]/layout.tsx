import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";
import { Footer } from "@/components/Footer";

const metropolis = localFont({
  src: [
    { path: "../../assets/fonts/metropolis-400.woff2", weight: "400" },
    { path: "../../assets/fonts/metropolis-600.woff2", weight: "600" },
    { path: "../../assets/fonts/metropolis-700.woff2", weight: "700" },
    { path: "../../assets/fonts/metropolis-800.woff2", weight: "800" },
  ],
  variable: "--font-metropolis",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allowIndexing = process.env.ALLOW_INDEXING === "true";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    robots: allowIndexing ? undefined : { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${metropolis.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
