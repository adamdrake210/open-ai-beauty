import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { Navigation } from "@/components/Navigation";
import Head from "next/head";
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
        <div className="font-primary font-extralight mx-auto max-w-screen-lg text-gray-600 h-100 w-full">
          {children}
          <LegalDisclaimer />
        </div>
      </body>
    </html>
  );
}
