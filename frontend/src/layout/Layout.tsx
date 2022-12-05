import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { Navigation } from "@/components/Navigation";
import { SocialLinks } from "@/components/SocialLinks";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div className="container font-primary font-thin mx-auto text-gray-600 h-full w-full p-2 max-w-screen-xl">
        {children}
        <SocialLinks />
        <LegalDisclaimer />
      </div>
    </>
  );
}
