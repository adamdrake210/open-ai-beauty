import { Navigation } from "@/components/Navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <Navigation />
        <div className="container mx-auto max-w-screen-lg text-gray-600 font-light">
          {children}
        </div>
      </body>
    </html>
  );
}
