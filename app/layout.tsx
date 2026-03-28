import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { personalInfo } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sudipta Ghorami",
  description: personalInfo.bio,
  icons: {
    icon: "/sudipta2.jpeg",
    shortcut: "/sudipta2.jpeg",
    apple: "/sudipta2.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
