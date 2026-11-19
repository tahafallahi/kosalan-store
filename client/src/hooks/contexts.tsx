import CartContenxt from "@/contexts/cart";
import { useContext } from "react";

export default function useCartContext() {
  const context = useContext(CartContenxt);

  if (context === undefined)
    throw new Error(
      "useCartContext must be used within a CartContext provider.",
    );

  if (!context) throw new Error("Give Cart Context a value before using it")
  return context
}
