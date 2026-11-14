import { configureStoreSearch, defineMiddlewares, validateAndTransformBody } from '@medusajs/framework/http'
import { CreateCategoryImagesSchema } from './admin/categories/[category_id]/image/route'

// The product index declares filterable `status` and `sales_channel_ids`, so
// the route narrows it to published products in the key's sales channels.
export default defineMiddlewares({
  routes: [
    {
      method: ['POST'],
      matcher: '/store/search',
      middlewares: [
        configureStoreSearch({
          allowed_indexes: {
            product: true,
          },
        }),
      ],
    },
    {
      matcher: "/admin/categories/:category_id/image",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(CreateCategoryImagesSchema),
      ],
    },
  ],
})