import { makeAutoObservable, observable } from 'mobx'
import { ProductPieces } from './types'
import { Id, Range } from '@/shared/api/instance'
import { getProducts, getProductsImages, getProductsVariations } from './api'

const SIZE_PRODUCT = 12

class ProductStore {
  products = observable.map<number, ProductPieces>()
  lastId: number = 0
  hasMore: boolean = true
  loading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  async loadProducts(selectedCategory: Id | null) {
    if (!this.hasMore || this.loading) return

    this.loading = true
    try {
      const newLastId = this.lastId + SIZE_PRODUCT - 1
      const range: Range = [this.lastId, newLastId]

      const newProducts = await getProducts(range, selectedCategory)
      const productIds = newProducts.map(product => product.id)

      const [variations, images] = await Promise.all([
        getProductsVariations(productIds),
        getProductsImages(productIds)
      ])

      newProducts.forEach(product => {
        const productVariations = variations.filter(v => v.product_id === product.id)
        const productImages = images.filter(i => i.product_id === product.id)
        this.products.set(product.id, {
          ...product,
          variations: productVariations,
          images: productImages
        })
      })

      this.hasMore = newProducts.length === SIZE_PRODUCT
      this.lastId = newLastId
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }

  clearData() {
    this.products.clear()
    this.lastId = 0
    this.hasMore = true
  }

  get productsList(): ProductPieces[] {
    return Array.from(this.products.values())
  }
}

export const productStore = new ProductStore()
