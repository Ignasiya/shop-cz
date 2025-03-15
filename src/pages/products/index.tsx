import { categoryStore } from '@/entities/category'
import { CategoriesList } from '@/features/categories-list.tsx'
import { ProductList } from '@/features/product-list'
import { useEffect } from 'react'

export default function Products() {
  useEffect(() => {
    categoryStore.fetchCategories()
  })

  return (
    <div className='flex flex-col gap-5'>
      <CategoriesList />

      <ProductList />
    </div>
  )
}
