import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Roboto_Condensed, Tiny5 } from "next/font/google";
import SiteShell from "@/components/layouts/site-shell";
import { IntroLoader } from "./loading";
import "./globals.css";

const pixel = Tiny5({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-tiny5",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-condensed",
});

export const metadata: Metadata = {
  title: "Subash Lama Tamang | Full-Stack Developer",
  description:
    "Portfolio of Subash Lama Tamang, a full-stack developer and UI/UX designer.",
};

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full ${pixel.variable} ${robotoCondensed.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <IntroLoader />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
