import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monument Explorer",
  description:
    "AI-Powered Interactive Historical Tourism and Monument Exploration System",
  keywords: [
    "Monument Explorer",
    "Historical Tourism",
    "AI",
    "Monuments",
    "History",
    "Next.js",
    "FastAPI",
  ],
  authors: [
    {
      name: "Monument Explorer Team",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-950 text-white">
        {children}
      </body>
    </html>
  );
}