"use client"

import AddRemoveButton from "@/components/ui/add-remove-button";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import useCartContext from "@/hooks/contexts";
import { StoreProduct } from "@medusajs/types";

interface Props {
  product: StoreProduct;
}

export default function ProductDetailsButton({ product }: Props) {
  const [optimisticCart, setOptimsticCart] = useCartContext();
  const cartItem = optimisticCart?.items?.filter(
    (i) => i.product_id === product.id,
  )[0];

  return (
    <>
      {cartItem && setOptimsticCart ? (
        <AddRemoveButton
          optimisticCart={optimisticCart}
          setOptimisticCart={setOptimsticCart}
          cartItem={cartItem}
          detailed
        />
      ) : (
        <AddToCartButton
          optimisticCart={optimisticCart}
          setOptimisticCart={setOptimsticCart}
          product={product}
        />
      )}
    </>
  );
}
