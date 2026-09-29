import { SearchSection } from "@/components/SearchSection";
import { AmbitionsSection } from "@/components/AmbitionsSection";
import { ContactSection } from "@/components/ContactSection";

export default async function Home() {
  return (
    <main className="flex-1">
      <SearchSection />
      <AmbitionsSection />
      <ContactSection />
      {/* TEMP: scroll filler for test */}
      <div className="h-[200vh]" />
    </main>
  );
}
