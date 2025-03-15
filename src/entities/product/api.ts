import { getList, Id, Params, Range } from '@/shared/api/instance'
import { ProductSchema, ProductImagesSchema, ProductVariationSchema } from './types'
import { z } from 'zod'

export const getProducts = async (range: Range, categoryId: Id | null) => {
  const params: Params = { range }
  if (categoryId) params.filter = { category_id: categoryId }

  const response = await getList('products', params)
  return z.array(ProductSchema).parse(response)
}

export const getProductsVariations = async (productsId: Id | Id[]) => {
  const params: Params = {}
  if (productsId) params.filter = { product_id: productsId }

  const response = await getList('productVariations', params)
  return z.array(ProductVariationSchema).parse(response)
}

export const getProductsImages = async (productsId: Id | Id[]) => {
  const params: Params = {}
  if (productsId) params.filter = { product_id: productsId }

  const response = await getList('productImages', params)
  return z.array(ProductImagesSchema).parse(response)
}
