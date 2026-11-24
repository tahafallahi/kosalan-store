import { StoreCartLineItem } from "@medusajs/types";
import ProductItem from "./components/product-item";
import TextSection from "@/components/layout/text-section/text-section";

interface Props {
  cartItems: StoreCartLineItem[];
  compact?: boolean;
}

export default function ProductList({ cartItems }: Props) {
  return (
    <TextSection title="سبد خرید">
      <div className="flex flex-col text-foreground">
        {cartItems.map((i) => (
          <ProductItem cartItem={i} key={i.id} />
        ))}
      </div>
    </TextSection>
  );
}
