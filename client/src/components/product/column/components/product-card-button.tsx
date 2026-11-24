"use client";

// import useMounetd from "@/hooks/mount";
import { StoreProduct } from "@medusajs/types";
import useCartContext from "@/hooks/contexts";
import QuantityButton from "@/components/shared/button/quantity-button";
import AddToCartButton from "@/components/shared/button/add-to-cart-button";

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
        <QuantityButton
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
