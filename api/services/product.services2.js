import { faker } from '@faker-js/faker'
import { Product } from '../db/models/product.model.js'
import { notFound } from '@hapi/boom'
import { sequelize } from '../lib/sequelize.js'

class ProductsService {
  constructor () {
    this.products = []
    this.generate()
  }

  generate () {
    const limit = 100
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async find () { // 🚨🚨🚨
    // console.log(`🚨> Aquí esta el problema <🚨
    //   🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧`)
    // const res = await Product.findAll()
    // return res

    const query = 'SELECT * FROM tasks'
    const [data] = await sequelize.query(query) // retorna data y metadata
    console.log(`🚨> Aquí esta el problema <🚨
    🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧`)
    return data
  }

  async findOne (id) {
    const product = await Product.findByPk(id)
    if (!product) {
      throw notFound('Product not found')
    }
    return product
  }

  async create (data) {
    console.log('ᓚᘏᗢ [data] : ', await data)

    console.log(`🚨> Aquí esta el problema <🚨
      🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧`)
    const newProduct = await Product.create(data)
    console.log(`🚨> Aquí esta el problema <🚨
      🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧`)

    return newProduct

    // const elementosValidos = ['name', 'price', 'image']
    // Elimina cualquier dato extra
    // Object.keys(data).forEach((key) => elementosValidos.includes(key) || delete data[key])
    // const newProduct = {
    //   id: faker.string.uuid(),
    //   ...data
    // }
    // this.products.push(newProduct)
  }

  async update (id, changes) {
    const product = await this.findOne(id)
    const res = await product.update(changes)
    return res
  }

  async delete (id) {
    const product = await this.findOne(id)
    await product.destroy()
    return { id }
  }
}

export default ProductsService
