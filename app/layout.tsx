import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { personalInfo } from "@/lib/data";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Sudipta Ghorami | Full Stack Developer & AI Engineer",
  description: personalInfo.bio,
  icons: {
    icon: "/sudipta2.jpeg",
    shortcut: "/sudipta2.jpeg",
    apple: "/sudipta2.jpeg",
  },
};

export const viewport: Viewport = {
  themeColor: "#edf0f2",
};

// Applies a saved dark choice before first paint, so there's no flash.
// With nothing saved, the page stays light whatever the system setting is.
const themeScript = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.dataset.theme="dark";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#0f151b")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${plexSans.variable} ${plexMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
