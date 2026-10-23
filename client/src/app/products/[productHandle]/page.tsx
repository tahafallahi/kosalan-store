import ProductsCarousel from "@/components/carousels/products-carousel";
import ContentPadding from "@/components/layout/content-padding/content-padding";
import TextSection from "@/components/layout/text-section/text-section";
import ProdcutDetails from "@/components/product/product-datails/product-details";
import { listProdcuts, retriveProductByHandle } from "@/lib/data/products";

export const instant = false;

export async function generateStaticParams() {
  const products = await listProdcuts()

  return products.map(p => ({productHandle: p.handle}))
}

interface Props {
  params: Promise<{productHandle: string}>
}

export default async function Products({params}: Props) {
  const { productHandle } = await params;
  const product = await retriveProductByHandle(decodeURI(productHandle))


  return (
    <>
    {product.images && <ProductsCarousel imagePaths={product.images.map(i => i.url)} />}
    <ContentPadding>
      <ProdcutDetails product={product}/>
      <TextSection title="توضیحات" body={product.description ?? undefined}/>
    </ContentPadding>
    </>
  );
}