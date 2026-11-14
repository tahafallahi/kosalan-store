
import { retrieveCart } from "@/lib/data/cart";
import { GetCartItemsCount } from "@/lib/utils/get-cart-items-count";

export default async function CartCounter() {
  const cart = await retrieveCart();

  return (
    <>
      {cart?.items ? (
        <p className="absolute -top-1 left-2 bg-red-500 rounded-full text-background w-5 h-5 text-center  text-sm/6">
          {GetCartItemsCount(cart)}
        </p>
      ) : null}
    </>
  );
}
