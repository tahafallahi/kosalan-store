import CategoriesColumn from "@/components/categories/column/categories-column";
import ContentPadding from "@/components/layout/content-padding/content-padding";
import { listCategories } from "@/lib/data/categories";

export default async function Categories() {
  const categories = await listCategories()

  return (
    <>
    <ContentPadding>
      <CategoriesColumn categories={categories}/>
    </ContentPadding>
    </>
  );
}