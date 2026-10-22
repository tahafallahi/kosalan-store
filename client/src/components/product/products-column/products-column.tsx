import { sdk } from "@/lib/medusa";
import ProductCard from "./product-card";
import ProductsSort from "./products-sort";
import Grid from "../../layout/grid/grid";
import { StoreProduct } from "@medusajs/types";

interface Props {
  products: StoreProduct[]
}

export default async function ProductsColumn({products}: Props) {

  return (
    <section>
      <ProductsSort />
      <Grid>
        {products.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </Grid>
    </section>
  );
}
