import { makeAutoObservable, runInAction } from 'mobx'
import { ProductPieces } from './types'
import { Id, Range } from '@/shared/api/instance'
import { getProducts, getProduct, getProductsImages, getProductsVariations } from './api'

const SIZE_PRODUCT = 12

class ProductStore {
  products = new Map<number, ProductPieces>()
  product: ProductPieces | null = null
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
      const newLastId = this.lastId + SIZE_PRODUCT
      const range: Range = [this.lastId, newLastId - 1]

      const newProducts = await getProducts(range, selectedCategory)
      const productIds = newProducts.map(product => product.id)

      const [variations, images] = await Promise.all([
        getProductsVariations(productIds),
        getProductsImages(productIds)
      ])

      runInAction(() => {
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
      })
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async loadProduct(id: Id) {
    try {
      const newProducts = await getProduct(id)

      const [variations, images] = await Promise.all([
        getProductsVariations(id),
        getProductsImages(id)
      ])

      runInAction(() => {
        this.product = {
          ...newProducts,
          variations,
          images
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  clearData() {
    this.products.clear()
    this.lastId = 0
    this.hasMore = true
  }

  clearProduct() {
    this.product = null
  }

  get productsList(): ProductPieces[] {
    return Array.from(this.products.values())
  }
}

export const productStore = new ProductStore()
