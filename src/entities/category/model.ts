import { makeAutoObservable, runInAction } from 'mobx'
import { getCategories } from './api'
import { Category } from './types'
import { Id } from '@/shared/api/instance'

class CategoryStore {
  categories: Category[] = []
  selectedCategory: Id | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async fetchCategories() {
    const categories = await getCategories()

    runInAction(() => {
      this.categories = categories
    })
  }

  setSelectedCategory(categoryId: Id | null) {
    this.selectedCategory = categoryId
  }
}

export const categoryStore = new CategoryStore()
