import { Product } from './Product'

export interface StoredProduct extends Product {
  id: number
  timestamp: string
}
