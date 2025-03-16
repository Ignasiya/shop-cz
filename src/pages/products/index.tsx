import { categoryStore } from '@/entities/category'
import { CategoriesList } from '@/features/categories-list.tsx'
import { ProductList } from '@/features/product-list'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Products() {
  useEffect(() => {
    categoryStore.fetchCategories()
  })

  return (
    <div className='flex flex-col gap-5'>
      <Head>
        <title>Главная страница</title>
        <meta name='description' content='Это главная страница моего сайта.' />
      </Head>
      <CategoriesList />

      <ProductList />
    </div>
  )
}
