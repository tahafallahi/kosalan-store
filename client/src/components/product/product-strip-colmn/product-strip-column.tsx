import { StoreCartLineItem } from "@medusajs/types";
import ProductStrip from "./product-strip";

interface Props {
  cartItems: StoreCartLineItem[]
  compact?: boolean
}

export default function ProductsStripColumn({cartItems}: Props) {

  return (
    <section>
      <div className="flex flex-col gap-4">
        {cartItems.map((i) => (
          <ProductStrip cartItem={i} key={i.id}/>
        ))}
      </div>
    </section>
  );
}
