import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learning App",
  description: "Application de gestion d'apprentissage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="h-screen w-screen flex bg-page">{children}</body>
    </html>
  );
}
