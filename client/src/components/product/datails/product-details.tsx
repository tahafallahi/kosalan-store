import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils/format-number";
import { StoreProduct } from "@medusajs/types";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import ProductDetailsButton from "./components/product-details-button";

interface Props {
  product: StoreProduct;
}

export default function ProdcutDetails({ product }: Props) {
  return (
    <section>
      <Card className="gap-4 p-4 text-base">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <div className="flex gap-1 shrink-0">
            <StarIcon weight="fill" className="text-yellow-400 size-5" />
            <p className="text-muted-foreground text-sm translate-y-px">
              ۴.۴ (۴ نظر)
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-muted-foreground flex flex-col gap-1 justify-start">
            {product.metadata &&
              Object.entries(product.metadata).map(([k, v]) => (
                <p key={k}>{`${k}: ${v}`}</p>
              ))}
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-xl font-bold text-primary">
              {formatNumber(
                Number(
                  product.variants?.[0]?.calculated_price?.calculated_amount,
                ),
              )}{" "}
              تومان
            </p>
            <ProductDetailsButton product={product} />
          </div>
        </div>
      </Card>
    </section>
  );
}
