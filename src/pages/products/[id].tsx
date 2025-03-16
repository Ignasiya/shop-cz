import { productStore } from '@/entities/product'
import { ProductDetails } from '@/entities/product'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

function ProductPage() {
  const productId = useParams()?.id
  const product = productStore.product

  useEffect(() => {
    if (!productId) return

    productStore.loadProduct(+productId)

    return () => {
      productStore.clearProduct()
    }
  }, [productId])

  return (
    <div className='flex flex-col gap-5'>
      <Head>
        <title>{product?.name}</title>
        <meta name='description' content='Страница товара' />
      </Head>

      <Link
        className='text-blue-500 hover:underline hover:text-blue-700 flex gap-2'
        href='/products'
      >
        <ChevronLeftIcon className='w-5 h-5' />
        Назад
      </Link>

      {product && <ProductDetails product={product} />}
    </div>
  )
}

export default observer(ProductPage)
