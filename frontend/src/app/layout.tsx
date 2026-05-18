import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Retail App",
  description: "Aplikasi retail kelompok 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
}
