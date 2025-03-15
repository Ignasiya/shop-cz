import { z } from 'zod'

export type ProductPieces = Product & { variations: ProductVariation[]; images: ProductImages[] }

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  category_id: z.number(),
  description: z.string()
})

export const ProductVariationSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  price: z.number(),
  stock: z.number()
})

export const ProductImagesSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  image_name: z.string(),
  image_url: z.string()
})

export type Product = z.infer<typeof ProductSchema>
export type ProductVariation = z.infer<typeof ProductVariationSchema>
export type ProductImages = z.infer<typeof ProductImagesSchema>
