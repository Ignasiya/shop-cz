import Image from 'next/image'
import Link from 'next/link'
import { buttonColors, colorClasses } from '@/shared/lib/colors'
import { categoryStore } from '../../category'
import { ProductPieces } from '../types'
import { cartStore } from '@/entities/cart'
import { observer } from 'mobx-react-lite'

type ProductProps = {
  product: ProductPieces
}

export const ProductItem = observer(({ product }: ProductProps) => {
  const color = buttonColors[(product.category_id - 1) % buttonColors.length]
  const classes = colorClasses[color]
  const category = categoryStore.categories.find(({ id }) => id === product.category_id)

  const isInCart = cartStore.hasItem(product.id)

  return (
    <article className='flex flex-col gap-1'>
      <Link
        href={`/products/${product.id}`}
        className='flex flex-col gap-1 relative hover:scale-105 transition-transform duration-100'
      >
        <div className='relative w-full h-80 md:h-46'>
          <Image
            src={product.images[0].image_url}
            alt={product.images[0].image_name}
            fill
            className='object-cover object-top'
            sizes='100%'
          />
        </div>

        <span
          className={`px-4 py-1 font-semibold text-sm rounded-full ${classes.inactive} absolute bottom-24 left-4`}
        >
          {category?.name}
        </span>

        <h4 className='truncate'>{product.name}</h4>

        <p className='text-2xl font-bold text-blue-500'>
          от{' '}
          <span className='font-semibold text-3xl'>
            {product.variations[0].price.toLocaleString()}
          </span>{' '}
          ₽
        </p>
      </Link>

      <button
        disabled={isInCart}
        onClick={() => cartStore.addToCart(product)}
        className='mt-2 px-8 py-2 rounded-full text-blue-500 border-1 hover:text-white hover:bg-blue-500 cursor-pointer transition-all disabled:bg-neutral-500 disabled:text-white disabled:cursor-default'
      >
        {isInCart ? 'В корзине' : 'Добавить в корзину'}
      </button>
    </article>
  )
})
