import { Request, Response } from 'express'
import ProductsContainer from '../models/ProductsContainer'

export const getAll = async(req: Request, res: Response) => {
    const products = await ProductsContainer.getAll()
  
    res.json(products)
}

export const getById = async(req: Request, res: Response) => {
    const { id } = req.params
    const body = await ProductsContainer.getById(Number(id))
  
    res.json(body)
}
   
export const addProduct = async(req: Request, res: Response) => {
    const product = req.body

    const storedProduct =  await ProductsContainer.addProduct(product)
    res.json(storedProduct)
}

export const updateProductById = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = req.body
  
    await ProductsContainer.updateProductById(Number(id), product)
  
    res.json({
      msg: `Product ${id} updated.`,
    })
  }

export const deleteProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const deletedProduct = await ProductsContainer.deleteProductById(Number(id))

    res.json({
        deletedProduct
    })
}
