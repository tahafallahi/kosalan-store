import { z } from "@medusajs/framework/zod"
import { createCategoryImagesWorkflow } from "../../../../../workflows/create-category-image"
import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const CreateCategoryImagesSchema = z.object({
      url: z.string(),
      file_id: z.string(),
})

type CreateCategoryImageInput = z.infer<typeof CreateCategoryImagesSchema>


export async function POST(
  req: MedusaRequest<CreateCategoryImageInput>,
  res: MedusaResponse
): Promise<void> {
  const { category_id } = req.params
  const image = req.validatedBody

  // Add category_id to each image
  const category_image = {...image, category_id}

  const { result } = await createCategoryImagesWorkflow(req.scope).run({
    input: {
      image: category_image
    },
  })

  res.status(200).json({ category_image: result })
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const { category_id } = req.params
  const query = req.scope.resolve(
    ContainerRegistrationKeys.QUERY
  )

  const { data: categoryImages } = await query.graph({
    entity: "product_category_image",
    fields: ["*"],
    filters: {
      category_id,
    },
  })

  res.status(200).json({ category_image: categoryImages[0] })
}