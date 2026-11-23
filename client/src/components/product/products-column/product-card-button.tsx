"use client";

import { useRetriveCart } from "@/hooks/data-hooks";
// import useMounetd from "@/hooks/mount";
import AddRemoveButton from "@/components/ui/add-remove-button";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import { StoreProduct } from "@medusajs/types";
import useCartContext from "@/hooks/contexts";

interface Props {
  product: StoreProduct;
}

export default function ProductCardButton({ product }: Props) {
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
