import { Error, Product, StoredProduct } from '../interfaces'
import { Knex } from 'knex'
import { mariaDBOption } from '../../DB/configDB'


class DBProductsContainer {

    productList: StoredProduct[]
    private db: Knex
    private table: string

    constructor(options: any, table: string) {
        this.productList = []
        this.db = require('knex')(options)
        this.table = table
        this.createTableIfNotExists()
    }

    private async createTableIfNotExists(): Promise<void> {
        if (!(await this.db.schema.hasTable(this.table))) {
            try {
                await this.db.schema.createTableIfNotExists(this.table, (table) => {
                    table.increments('id').primary()
                    table.string('title')
                    table.integer('price')
                    table.string('thumbnail')
                    table.integer('timestamp')
                });
            } catch (error) {
                console.error(error)
            }
        }
    }

    public async getAll(): Promise<StoredProduct[]> {

        const products: StoredProduct[] = await this.db.select('*').from(this.table)
        return products

    }

    public async getById(id: number): Promise<StoredProduct | Error> {
        try {
            const product = this.productList.find((product) => product.id === id)

            if (product) return product
            else return { 
                error: 'Product not found.' 
            }
        } catch (err: any) {
            console.log('Method getById: ', err)
        }
        return { error: 'Fetch item method failed' }
    }

    public async addProduct(product: Product): Promise<void> {
        try {
            const timestamp = Date.now()
            await this.db.insert({ ...product, timestamp }).into(this.table)
        }
        catch (err: any) {
            console.log('Method save: ', err)
        }
    }

    public async updateProduct(id: number, product: Product): Promise<void | Error> {
        try {
            this.productList = this.productList.map((object: StoredProduct) =>
                object.id === id ? { ...object, ...product } : object
            );
        } catch (err: any) {
            console.log('Method update: ', err)
        }
    }

    public async deleteProduct(id: number): Promise<void | Error> {
        try {
            this.productList = this.productList.filter((product) => product.id !== id)
        } catch (err: any) {
            console.log('Method deleteById: ', err)
        }
    }
}

export default new DBProductsContainer(mariaDBOption, 'products')