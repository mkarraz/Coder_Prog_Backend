import { StoredProduct } from './StoredProduct'

export interface Cart {
  cartId: number
  timestamp: string
  products: StoredProduct[]
}
