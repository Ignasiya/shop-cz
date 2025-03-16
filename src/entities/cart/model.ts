import { makeAutoObservable, runInAction } from 'mobx'
import { CartItem } from './types'
import { ProductPieces } from '../product/types'
import { makePersistable } from 'mobx-persist-store'

class CartStore {
  items = new Map<number, CartItem>()
  isHydrated = false

  constructor() {
    makeAutoObservable(this)

    if (typeof window !== 'undefined') {
      makePersistable(this, {
        name: 'cart',
        properties: ['items'],
        storage: window.localStorage
      }).then(() => {
        runInAction(() => {
          this.isHydrated = true
        })
      })
    }
  }

  addToCart(product: ProductPieces) {
    const existing = this.items.has(product.id)
    if (!existing) {
      this.items.set(product.id, { ...product, quantity: 1 })
    }
  }

  removeFromCart(productId: number) {
    this.items.delete(productId)
  }

  updateQuantity(productId: number, quantity: number) {
    const existing = this.items.has(productId)
    if (existing) {
      this.items.set(productId, { ...(this.items.get(productId) as CartItem), quantity })
    }
  }

  clearCart() {
    this.items.clear()
  }

  hasItem(id: number) {
    return this.items.has(id)
  }

  get itemsCount() {
    return this.items.size
  }

  get total() {
    return Array.from(this.items.values()).reduce(
      (sum, item) => sum + item.variations[0].price * item.quantity,
      0
    )
  }

  get itemsList(): CartItem[] {
    return Array.from(this.items.values())
  }
}

export const cartStore = new CartStore()
