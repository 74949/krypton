import type { Metadata } from "next";
import "./globals.css";
import { IntroAnimation } from "@/components/intro-animation";

export const metadata: Metadata = {
  title: "Aronxx Tech — AI Data Security",
  description: "Aronxx Tech helps organizations protect sensitive information during employee AI use.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/aronxx-tech-logo.png",
    shortcut: "/aronxx-tech-logo.png",
    apple: "/aronxx-tech-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><IntroAnimation />{children}</body>
    </html>
  );
}
