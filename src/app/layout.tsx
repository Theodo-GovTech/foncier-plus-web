import type { Metadata } from "next";
import Script from "next/script";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const metropolis = localFont({
  src: [
    { path: "../assets/fonts/metropolis-400.woff2", weight: "400" },
    { path: "../assets/fonts/metropolis-600.woff2", weight: "600" },
    { path: "../assets/fonts/metropolis-700.woff2", weight: "700" },
    { path: "../assets/fonts/metropolis-800.woff2", weight: "800" },
  ],
  variable: "--font-metropolis",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allowIndexing = process.env.ALLOW_INDEXING === "true";

export const metadata: Metadata = {
  title: "Foncier+",
  description: "Trouvez le foncier idéal pour réaliser votre projet économique",
  robots: allowIndexing ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${metropolis.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="matomo-tag-manager" strategy="afterInteractive">
          {`
            var _mtm = window._mtm = window._mtm || [];
            _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
            (function() {
              var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
              g.async = true;
              g.src = 'https://cdn.matomo.cloud/foncierpluss3websitefrparscwcloud.matomo.cloud/container_t2LCTS8k.js';
              s.parentNode.insertBefore(g, s);
            })();
          `}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
