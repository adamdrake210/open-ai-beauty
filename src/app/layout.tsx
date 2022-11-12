import { Navigation } from "@/components/Navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Navigation />
        <div className="container font-primary font-extralight mx-auto max-w-screen-lg text-gray-600 h-100">
          {children}
        </div>
      </body>
    </html>
  );
}
