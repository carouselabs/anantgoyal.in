import { Nav } from "@/components/site/Nav";
import { Providers } from "@/components/site/Providers";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Studio } from "@/components/sections/Studio";
import { WhyDesign } from "@/components/sections/WhyDesign";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Outreach } from "@/components/sections/Outreach";
import { WhyMe } from "@/components/sections/WhyMe";
import { Capabilities } from "@/components/sections/Capabilities";
import { Software } from "@/components/sections/Software";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { site, visibleSocials } from "@/content/site";

const profiles = visibleSocials.map((s) => s.href);
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  email: site.email,
  image: `${site.url}${site.portrait}`,
  ...(profiles.length ? { sameAs: profiles } : {}),
  founder: { "@type": "Person", name: site.name, jobTitle: site.role, email: site.email, image: `${site.url}${site.portrait}`, ...(profiles.length ? { sameAs: profiles } : {}) },
  description: "HTML email design, custom email software, email infrastructure and warm-up, and large-scale outreach: designing, sending and managing better email.",
  url: site.url,
  serviceType: ["HTML email design and development", "Custom email software development", "Email infrastructure and warm-up", "Email outreach"],
};

export default function Home() {
  return (
    <Providers>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Capabilities />
        <Services />
        <Work />
        <Software />
        <Infrastructure />
        <Outreach />
        <Studio />
        <WhyDesign />
        <WhyMe />
        <Process />
        <Contact />
      </main>
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Providers>
  );
}
