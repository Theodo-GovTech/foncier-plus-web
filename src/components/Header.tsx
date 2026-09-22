import Image from "next/image";
import Link from "next/link";
import logoFoncierPlus from "@/assets/logo-foncier-plus.svg";
import { NavButton } from "@/components/NavButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex min-h-16 max-w-page flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line px-4 py-3 lg:px-[114px]">
        <Link href="/">
          <Image
            src={logoFoncierPlus}
            alt="Foncier +"
            loading="eager"
            className="h-9 w-auto"
          />
        </Link>
        <nav
          aria-label="Navigation principale"
          className="flex flex-wrap items-center gap-2"
        >
          <NavButton href="/" variant="solid" aria-current="page">
            Entreprise
          </NavButton>
          <NavButton
            href="https://www.banquedesterritoires.fr/produits-services/services-digitaux/france-foncier"
            external
            variant="outline"
          >
            Collectivité
          </NavButton>
          <NavButton variant="accent">Nous contacter</NavButton>
        </nav>
      </div>
    </header>
  );
}
