import { SearchSection } from "@/components/SearchSection";
import { BusinessSectorsPathSection } from "@/components/BusinessSectorsPathSection";
import { AmbitionsSection } from "@/components/AmbitionsSection";
import { ContactSection } from "@/components/ContactSection";

export default async function Home() {
  return (
    <main className="flex-1">
      <SearchSection />
      <BusinessSectorsPathSection />
      <AmbitionsSection />
      <ContactSection />
    </main>
  );
}
