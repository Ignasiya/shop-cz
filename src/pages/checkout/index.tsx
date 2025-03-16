'use client'

import { cartStore } from '@/entities/cart'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'

const schema = yup.object().shape({
  name: yup.string().required('Введите имя'),
  address: yup.string().required('Введите адрес'),
  phone: yup
    .string()
    .matches(/^(\+7|8)?\d{10}$/, 'Введите корректный номер')
    .required('Введите телефон'),
  dateTime: yup.string().required('Выберите дату и время')
})

const deliveryPrice = 200

function Checkout() {
  const [isHydrated, setIsHydrated] = useState(false)
  const router = useRouter()
  const total = +cartStore.total + deliveryPrice
  console.log(cartStore.total, deliveryPrice)

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors }
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const onSubmit = () => {
    console.log('Заказ отправлен:')
    cartStore.clearCart()
    router.push('/products')
  }

  useEffect(() => {
    setIsHydrated(cartStore.isHydrated)
  }, [])

  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  return (
    <div>
      <Head>
        <title>Заказ</title>
        <meta name='description' content='Заказ' />
      </Head>
      <h2 className='text-xl font-bold mb-4'>Доставка</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex gap-5 justify-between items-start max-w-2xl'
      >
        <div className='grow flex flex-col gap-7'>
          <div>
            <label className='block text-md font-bold'>Когда доставить?</label>
            <input
              {...register('dateTime')}
              type='datetime-local'
              className='mt-2 h-10 w-full rounded-3xl focus: placeholder:text-neutral-500 px-5 outline-none border border-slate-200'
            />
            <p className='text-red-500 text-sm'>{errors.dateTime?.message}</p>
          </div>

          <div>
            <label className='block text-md font-bold'>Куда доставить?</label>
            <input
              {...register('address')}
              className='mt-2 h-10 w-full rounded-3xl focus: placeholder:text-neutral-500 px-5 outline-none border border-slate-200'
              placeholder='Выберите адрес доставки'
            />
            <p className='text-red-500 text-sm'>{errors.address?.message}</p>
          </div>

          <div>
            <label className='block text-md font-bold'>Имя</label>
            <input
              {...register('name')}
              className='mt-2 h-10 w-full rounded-3xl focus: placeholder:text-neutral-500 px-5 outline-none border border-slate-200'
            />
            <p className='text-red-500 text-sm'>{errors.name?.message}</p>
          </div>

          <div>
            <label className='block text-md font-bold'>Телефон</label>
            <input
              {...register('phone')}
              className='mt-2 h-10 w-full rounded-3xl focus: placeholder:text-neutral-500 px-5 outline-none border border-slate-200'
            />
            <p className='text-red-500 text-sm'>{errors.phone?.message}</p>
          </div>
        </div>

        {isHydrated && (
          <div className='flex flex-col gap-3 w-xs'>
            <div className='bg-neutral-100 p-5 rounded-3xl gap-1 grid grid-cols-[1fr_100px]'>
              <p className='text-sm text-slate-500'>Стоимость товаров:</p>
              <p className='text-slate-500 justify-self-end'>{cartStore.total.toLocaleString()}₽</p>
              <p className='text-sm text-slate-500'>Стоимость доставки:</p>
              <p className='text-sm text-slate-500 justify-self-end'>
                {deliveryPrice.toLocaleString()}₽
              </p>
              <p className='mt-4 text-slate-500'>Итого:</p>
              <p className='mt-4 text-slate-900 justify-self-end'>{total.toLocaleString()}₽</p>
            </div>

            <button
              type='submit'
              className='px-15 py-3 rounded-full hover:bg-white hover:text-blue-500 border-1 text-white bg-blue-500 cursor-pointer transition-all disabled:bg-neutral-500 disabled:text-white disabled:cursor-default'
            >
              Сделать заказ
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default observer(Checkout)
