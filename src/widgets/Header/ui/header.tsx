'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { cartStore } from '@/entities/cart'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

export const Header = observer(() => {
  const [isHydrated, setIsHydrated] = useState(false)
  const sizeCart = cartStore.itemsCount

  useEffect(() => {
    setIsHydrated(cartStore.isHydrated)
  }, [])

  return (
    <header className='min-h-20 flex flex-wrap gap-6 justify-center lg:justify-between items-center py-5 px-12 lg:order-1'>
      <Link href='/products' className='font-bold text-4xl'>
        React
      </Link>
      <span className='text-neutral-500 hover:text-neutral-700 cursor-pointer lg:order-2'>
        История заказов
      </span>

      <Link
        href='/cart'
        className='h-[50px] w-[50px] rounded-full border-neutral-500 text-neutral-500 border flex items-center justify-center cursor-pointer hover:bg-neutral-100 relative lg:order-4'
      >
        <ShoppingCartIcon className='w-6 h-6' />
        {isHydrated && sizeCart > 0 && (
          <div className='w-8 h-8 flex items-center justify-center text-blue-600 font-semibold absolute -top-2 -right-3 rounded-full bg-white'>
            {sizeCart > 99 ? '99+' : sizeCart}
          </div>
        )}
      </Link>
      <div className='h-[50px] w-[50px] rounded-full lg:order-5'>
        <Image src='/avatar.png' alt='avatar' width={50} height={50} className='rounded-full' />
      </div>
      <search className='h-[50px] max-w-[468px] grow relative justify-between lg:ml-auto lg:order-3'>
        <input
          type='text'
          placeholder='Поиск бренда, товара, категории...'
          className='h-full w-full rounded-3xl focus: placeholder:text-neutral-500 pl-5 pr-26 outline-none border border-slate-200'
        />
        <button
          type='submit'
          className='h-11 rounded-3xl w-23 flex items-center justify-center bg-slate-200 hover:bg-slate-300 hover:text-neutral-600 text-neutral-500 cursor-pointer absolute top-[3px] right-[3px]'
        >
          <MagnifyingGlassIcon className='w-5 h-5 ' />
        </button>
      </search>
    </header>
  )
})
