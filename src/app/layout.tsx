import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
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

export const metadata: Metadata = {
  title: "Foncier+",
  description: "Trouvez le foncier idéal pour réaliser votre projet économique",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${metropolis.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
