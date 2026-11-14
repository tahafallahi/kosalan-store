import { model } from "@medusajs/framework/utils";

const ProductCategoryImage = model
  .define("product_category_image", {
    id: model.id().primaryKey(),
    url: model.text(),
    file_id: model.text(),
    category_id: model.text(),
  })
  .indexes([
    {
      on: ["category_id"],
      unique: true,
      name: "unique_image_per_category",
    },
  ]);

  export default ProductCategoryImage
