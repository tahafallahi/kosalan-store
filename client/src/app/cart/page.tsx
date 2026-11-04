import { retrieveCart } from "@/lib/data/cart";

export default async function Cart() {
  const products = await retrieveCart()
  return (
    <ProductsStripColumn />
  );
}