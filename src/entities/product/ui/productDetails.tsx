import Image from 'next/image'
import { ProductPieces } from '../types'
import { cartStore } from '@/entities/cart'
import { observer } from 'mobx-react-lite'

type ProductProps = {
  product: ProductPieces
}

export const ProductDetails = observer(({ product }: ProductProps) => {
  const isInCart = cartStore.hasItem(product.id)

  return (
    <div className='flex flex-col gap-7'>
      <h2 className='text-2xl font-semibold'>{product.name}</h2>

      <div className='flex gap-5 flex-wrap items-start'>
        <Image
          src={product.images[0].image_url}
          alt={product.images[0].image_name}
          width={450}
          height={400}
        />

        <div className='bg-neutral-200 p-5 rounded-3xl grow flex flex-col gap-3'>
          <p className='text-2xl font-bold text-black'>
            <span className='font-semibold text-3xl'>
              {product.variations[0].price.toLocaleString()}
            </span>
            ₽ <span className='text-sm font-light'>за шт.</span>
          </p>

          <p className='text-md font-light'>
            В наличии{' '}
            <span className='font-semibold text-blue-500'>{product.variations[0].stock}</span> шт.
          </p>

          <button
            disabled={isInCart}
            onClick={() => cartStore.addToCart(product)}
            className='px-6 py-3 rounded-full hover:bg-white hover:text-blue-500 border-1 text-white bg-blue-500 cursor-pointer transition-all disabled:bg-neutral-500 disabled:text-white disabled:cursor-default'
          >
            {isInCart
              ? 'В корзине'
              : `В корзину за ${product.variations[0].price.toLocaleString()}₽`}
          </button>
        </div>
      </div>
    </div>
  )
})
