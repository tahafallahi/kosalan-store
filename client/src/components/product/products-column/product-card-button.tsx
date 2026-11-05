import AddRemoveButton from "@/components/ui/add-remove-button";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import { retrieveCart } from "@/lib/data/cart";
import { StoreProduct } from "@medusajs/types";

interface Props {
  product: StoreProduct;
}

export default async function ProductCardButton({ product }: Props) {
  const cart = await retrieveCart();
  const itemInCart = cart?.items?.filter((i) => i.product_id === product.id);

  return (
    <>
      {!!itemInCart?.length ? (
        <AddRemoveButton cartItem={itemInCart[0]}  detailed/>
      ) : (
        <AddToCartButton product={product} />
      )}
    </>
  );
}
