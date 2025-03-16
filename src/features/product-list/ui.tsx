import { categoryStore } from '@/entities/category'
import { productStore } from '@/entities/product'
import { ProductItem } from '@/entities/product'
import { Loader } from '@/shared/ui/Loader'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useRef } from 'react'

export const ProductList: FC = observer(() => {
  const selectCategory = categoryStore.selectedCategory
  const isLoading = productStore.loading
  const products = productStore.productsList

  const lastProductRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const target = entries[0]
        if (target.isIntersecting) {
          productStore.loadProducts(selectCategory)
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 10px 0px',
        threshold: 0.1
      }
    )

    const currentRef = lastProductRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [products.length, selectCategory])

  useEffect(() => {
    productStore.loadProducts(selectCategory)

    return () => productStore.clearData()
  }, [selectCategory])

  return (
    <>
      <ul className='list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {productStore.productsList.map((product, index) => {
          const isLast = index === products.length - 1

          return (
            <li key={product.id} ref={isLast ? lastProductRef : null}>
              <ProductItem product={product} />
            </li>
          )
        })}
      </ul>
      {isLoading && (
        <div className='flex justify-center'>
          <Loader />
        </div>
      )}
    </>
  )
})
