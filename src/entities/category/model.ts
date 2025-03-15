import { makeAutoObservable } from 'mobx'
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
    this.categories = await getCategories()
  }

  setSelectedCategory(categoryId: Id | null) {
    this.selectedCategory = categoryId
  }
}

export const categoryStore = new CategoryStore()
