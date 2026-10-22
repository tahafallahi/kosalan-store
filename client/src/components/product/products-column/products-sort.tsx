import { SortAscendingIcon } from "@phosphor-icons/react/dist/ssr";

export default function ProductsSort() {
  const sortMethods = ["پرفروش", "امتیاز", "گرانترین", "ارزانترین", "تازه"];

  return (
    <div className="border-b flex gap-3 flex-wrap mb-4 pb-1">
      <div className="flex gap-1 shrink-0">
        <SortAscendingIcon className="size-6" />
      <p>مرتب سازی: </p>
      </div>
      {sortMethods.map((s) => (
        <p key={s} className="text-muted-foreground">{s}</p>
      ))}
    </div>
  );
}
