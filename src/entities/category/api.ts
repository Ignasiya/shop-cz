import { getList } from '@/shared/api/instance'
import { CategorySchema } from './types'
import { z } from 'zod'

export const getCategories = async () => {
  const response = await getList('categories')
  return z.array(CategorySchema).parse(response)
}
