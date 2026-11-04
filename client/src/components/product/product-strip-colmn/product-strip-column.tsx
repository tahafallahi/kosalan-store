import Grid from "../../layout/grid/grid";
import { StoreProduct } from "@medusajs/types";
import ProductStrip from "./product-strip";

interface Props {
  products: StoreProduct[]
}

export default async function ProductsStripColumn({products}: Props) {

  return (
    <section>
      <div>
        {products.map((p) => (
          <ProductStrip product={p} key={p.id} />
        ))}
      </div>
    </section>
  );
}
