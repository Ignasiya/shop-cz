import { ProductPieces } from '../product/types'

export type CartItem = ProductPieces & { quantity: number }
