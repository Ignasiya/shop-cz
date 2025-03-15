import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  parent_id: z.number()
})

export type Category = z.infer<typeof CategorySchema>
