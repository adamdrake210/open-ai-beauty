import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { Navigation } from "@/components/navigation/Navigation";
import { SocialLinks } from "@/components/SocialLinks";
import { Container } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <Container size="lg">
        {children}
        <SocialLinks />
        <LegalDisclaimer />
      </Container>
    </>
  );
}
