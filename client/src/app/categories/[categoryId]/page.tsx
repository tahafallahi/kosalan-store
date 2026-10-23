import PostersCarousel from "@/components/carousels/posters-carousel";
import CategoriesStrip from "@/components/categories/strip/categories-strip";
import ContentPadding from "@/components/layout/content-padding/content-padding";
import ProductsColumn from "@/components/product/products-column/products-column";
import { listCategories } from "@/lib/data/categories";
import { listProdcuts } from "@/lib/data/products";


export const instant = false

export async function generateStaticParams() {
  const categories = await listCategories();
  
  categories.forEach(c => console.log(c)) 
  
  return categories.map((c) => ({
    categoryId: c.id,
  }))
}

interface Props {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryProducts({ params }: Props) {
  const { categoryId } = await params;
  const products = await listProdcuts(categoryId);
  const categories = await listCategories()

  return (
    <>
      <PostersCarousel
        imagePaths={["/posters/1.png", "/posters/2.png", "/posters/3.png"]}
      />
      <CategoriesStrip categories={categories} />
      <ContentPadding>
        <ProductsColumn products={products} />
      </ContentPadding>
    </>
  );
}
