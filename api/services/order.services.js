import { Order } from '../db/models/order.model.js'

class OrderService {
  async create (data) {
    const newOrder = await Order.create(data)
    return newOrder
  }

  async addItem (data) {
    const newItem = await Order.create(data)
    return newItem
  }

  async find () {
    return []
  }

  async findOne (id) {
    const order = await Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    })
    return order
  }

  async update (id, changes) {
    return {
      id,
      changes
    }
  }

  async delete (id) {
    return { id }
  }
}

export default OrderService
