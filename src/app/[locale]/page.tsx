import { SearchSection } from "@/components/SearchSection";
import { NewsSection } from "@/components/NewsSection";
import {
  BusinessSectorsPathSection,
  commitmentsSectionId,
} from "@/components/BusinessSectorsPathSection";
import { AmbitionsSection } from "@/components/AmbitionsSection";
import { ContactSection } from "@/components/ContactSection";
import { RegionMapSection } from "@/components/RegionMapSection";

const Home = async () => (
  <main className="flex-1">
    <SearchSection />
    <NewsSection />
    <RegionMapSection />
    <div id={commitmentsSectionId}>
      <AmbitionsSection />
      <BusinessSectorsPathSection />
    </div>
    <ContactSection />
  </main>
);

export default Home;
