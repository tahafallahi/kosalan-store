import PostersCarousel from "@/components/carousels/posters-carousel";
import CategoriesStrip from "@/components/categories/strip/categories-strip";
import ContentPadding from "@/components/layout/content-padding/content-padding";
import ProductsColumn from "@/components/product/products-column/products-column";
import { listProdcuts } from "@/lib/data/products";
import { listCategories } from "@/lib/data/categories";

export default async function Home() {
  const products = await listProdcuts()
  const categories = await listCategories()

  return (
    <>
    <PostersCarousel imagePaths={["/posters/1.png", "/posters/2.png", "/posters/3.png"]} />
    <CategoriesStrip categories={categories}/>
    <ContentPadding>
      <ProductsColumn products={products} />
    </ContentPadding>
    </>
  );
}
