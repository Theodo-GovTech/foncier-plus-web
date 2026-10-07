import { SearchSection } from "@/components/SearchSection";
import { BusinessSectorsPathSection } from "@/components/BusinessSectorsPathSection";
import { AmbitionsSection } from "@/components/AmbitionsSection";
import { ContactSection } from "@/components/ContactSection";
import { RegionMapSection } from "@/components/RegionMapSection";

const Home = async () => (
  <main className="flex-1">
    <SearchSection />
    <BusinessSectorsPathSection />
    <AmbitionsSection />
    <RegionMapSection />
    <ContactSection />
  </main>
);

export default Home;
