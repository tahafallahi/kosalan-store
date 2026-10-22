import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { DirectionProvider } from "@/components/ui/direction";
import Header from "@/components/layout/header/header";
import MobileNav from "@/components/layout/mobile-nav/mobile-nav";
import Main from "@/components/layout/main/main";
import { Suspense } from "react";
import ProductsCarousel from "@/components/carousels/products-carousel";
import SimpleTextSection from "@/components/layout/text-section/text-section";
import { sdk } from "../../config";
import ProductsColumn from "@/components/product/products-column/products-column";
import ProdcutDetails from "@/components/product/product-datails/product-details";

const vazirMatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "لبنیات کوسالان",
  description: "فروش انواع مواد غذایی طبیعی، تحویل به درب منزل",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { regions } = await sdk.store.region.list()
  const products = (await sdk.store.product.list({region_id: regions[0].id, fields: "*variants.calculated_price, +metadata"})).products;

  return (
    <html lang="fa" dir="rtl" className={`${vazirMatn.variable} antialiased`}>
      <body>
        <DirectionProvider>
          <Header />
          <Main>
            {children}
            <Suspense fallback={"Loading..."}>
              <ProdcutDetails product={products[4]} />
            </Suspense>
          </Main>
          <MobileNav />
        </DirectionProvider>
      </body>
    </html>
  );
}
