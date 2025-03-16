import { categoryStore } from '@/entities/category'
import { buttonColors, colorClasses } from '@/shared/lib/colors'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'

const buttonClass = 'px-4 py-1 font-semibold text-sm border-2 rounded-full cursor-pointer'

export const CategoriesList: FC = observer(() => {
  const selectCategory = categoryStore.selectedCategory

  useEffect(() => {
    categoryStore.fetchCategories()
  }, [])

  return (
    <section>
      <div className='flex justify-between max-w-md'>
        <h2 className='text-xl font-semibold'>Категории товаров</h2>
        <button className='text-blue-600 text-sm'>Настройки</button>
      </div>

      <nav className='mt-4'>
        <ul className='list-none flex flex-wrap gap-1 transition-all'>
          <li>
            <button
              onClick={() => categoryStore.setSelectedCategory(null)}
              className={`${buttonClass} ${
                selectCategory === null
                  ? 'bg-white text-gray-800 border-gray-800'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Все товары
            </button>
          </li>
          {categoryStore.categories.map(({ id, name }) => {
            const color = buttonColors[(id - 1) % buttonColors.length]
            const classes = colorClasses[color]

            return (
              <li key={id}>
                <button
                  onClick={() => categoryStore.setSelectedCategory(id)}
                  className={`${buttonClass} ${
                    selectCategory === id ? classes.active : classes.inactive
                  }`}
                >
                  {name}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </section>
  )
})
