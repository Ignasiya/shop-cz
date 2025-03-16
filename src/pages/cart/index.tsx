'use client'

import { cartStore } from '@/entities/cart'
import { TrashIcon } from '@heroicons/react/24/outline'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Cart() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(cartStore.isHydrated)
  }, [])

  return (
    <div className='flex flex-col gap-5'>
      <Head>
        <title>Корзина</title>
        <meta name='description' content='Корзина товаров' />
      </Head>
      <section className='flex flex-col gap-8'>
        <div className='flex gap-8 items-end'>
          <h2 className='text-xl font-semibold'>Корзина</h2>
          <button
            className='text-pink-600 hover:text-pink-500 text-md font-semibold cursor-pointer'
            onClick={() => cartStore.clearCart()}
          >
            Очистить корзину
          </button>
        </div>

        {isHydrated && (
          <div className='rounded-2xl border-b border-r border-l border-slate-300'>
            <div className='h-25 flex gap-20 p-6 rounded-2xl border border-slate-300 bg-[url(/cart.png)] bg-no-repeat bg-right items-center justify-center'>
              <div>
                <p className='text-sm'>Стоимость корзины:</p>
                <p className='text-xl font-semibold'>{cartStore.total.toLocaleString()}₽</p>
              </div>
              <Link
                href={'/checkout'}
                className='px-15 py-3 rounded-full hover:bg-white hover:text-blue-500 border-1 text-white bg-blue-500 cursor-pointer transition-all disabled:bg-neutral-500 disabled:text-white disabled:cursor-default'
              >
                Оформить
              </Link>
            </div>
            <ul className='list-none px-14 py-10'>
              {cartStore.itemsList.map(item => (
                <li
                  key={item.id}
                  className='grid grid-cols-[1fr_auto_auto_100px] items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0 py-5'
                >
                  <div className='flex gap-5'>
                    <div className='relative w-20 h-20'>
                      <Image
                        src={item.images[0].image_url}
                        alt={item.images[0].image_name}
                        fill
                        className='object-contain'
                      />
                    </div>
                    <Link
                      href={`/products/${item.id}`}
                      className='truncate max-w-[400px] cursor-pointer'
                    >
                      {item.name}
                    </Link>
                  </div>

                  <div className='flex items-center'>
                    <button
                      onClick={() => cartStore.updateQuantity(item.id, item.quantity - 1)}
                      className='w-8 h-8 text-xl border-l border-t border-b rounded-l-3xl border-gray-200 flex items-center justify-center hover:text-gray-500 cursor-pointer'
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type='number'
                      value={item.quantity}
                      min={1}
                      max={item.variations[0].stock}
                      onChange={e => cartStore.updateQuantity(item.id, Number(e.target.value))}
                      className='w-12 h-8 text-center border-t border-b border-gray-200 focus:outline-none'
                    />
                    <button
                      onClick={() => cartStore.updateQuantity(item.id, item.quantity + 1)}
                      className='w-8 h-8 text-xl border-r border-t border-b rounded-r-3xl border-gray-200 flex items-end justify-center hover:text-gray-500 cursor-pointer'
                      disabled={item.quantity >= item.variations[0].stock}
                    >
                      +
                    </button>
                  </div>

                  <span className='text-sm font-bold'>
                    от {item.variations[0].price.toLocaleString()} ₽
                  </span>

                  <button
                    onClick={() => cartStore.removeFromCart(item.id)}
                    className='text-neutral-400 cursor-pointer justify-self-end'
                  >
                    <TrashIcon className='w-3 h-3' />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}

export default observer(Cart)
