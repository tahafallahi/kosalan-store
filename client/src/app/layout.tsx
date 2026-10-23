import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { DirectionProvider } from "@/components/ui/direction";
import Header from "@/components/layout/header/header";
import MobileNav from "@/components/layout/mobile-nav/mobile-nav";
import Main from "@/components/layout/main/main";

const vazirMatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "لبنیات کوسالان",
  description: "فروش انواع مواد غذایی طبیعی، تحویل به درب منزل",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "oklch(0.97 0 0)", // match your bg-card color (use the media array for dark mode)
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirMatn.variable} antialiased`}>
      <body>
        <DirectionProvider>
          <Header />
          <Main>
            {children}
          </Main>
          <MobileNav />
        </DirectionProvider>
      </body>
    </html>
  );
}
