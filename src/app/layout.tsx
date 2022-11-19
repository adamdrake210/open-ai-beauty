import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { Navigation } from "@/components/Navigation";
import { SocialLinks } from "@/components/SocialLinks";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navigation />
        <div className="font-primary font-extralight mx-auto max-w-screen-lg text-gray-600 h-screen w-full p-4">
          {children}
          <SocialLinks />
          <LegalDisclaimer />
        </div>
      </body>
    </html>
  );
}
