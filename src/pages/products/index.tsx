import { CategoriesList } from '@/features/categories-list.tsx'
import { ProductList } from '@/features/product-list'
import Head from 'next/head'

export default function Products() {
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
