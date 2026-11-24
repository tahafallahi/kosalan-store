import PostersCarousel from "@/components/carousel/posters/posters-carousel";
import CategoriesStrip from "@/components/category/strip/categories-strip";
import ContentPadding from "@/components/layout/content-padding/content-padding";
import ProductsColumn from "@/components/product/column/products-column";
import { listProdcuts } from "@/lib/data/products";
import { listCategories } from "@/lib/data/categories";
import Footer from "@/components/layout/footer/footer";

export default async function Home() {
  const products = await listProdcuts();
  const categories = await listCategories();

  return (
    <>
      <PostersCarousel
        imagePaths={["/posters/1.png", "/posters/2.png", "/posters/3.png"]}
      />
      <div className="block lg:hidden">
        <CategoriesStrip categories={categories} />
      </div>
      <ContentPadding>
        <div className="hidden lg:block">
          <CategoriesStrip categories={categories} />
        </div>
        <ProductsColumn products={products} />
      </ContentPadding>
      <Footer />
    </>
  );
}
