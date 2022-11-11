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
        <div className="container mx-auto max-w-screen-lg">{children}</div>
      </body>
    </html>
  );
}
