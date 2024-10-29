import { faker } from '@faker-js/faker'
// import { pool } from "../lib/postgres.pool.js";
import { Customer } from '../db/models/customer.model.js'
import { notFound } from '@hapi/boom'

class CustomersService {
  constructor () {
    this.customers = []
    this.generate()
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  generate () {
    const limit = 5
    for (let index = 0; index < limit; index++) {
      this.customers.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email()
      })
    };
  }

  async find () {
    const res = await Customer.findAll({
      include: ['user']
    })
    return res

    // const query ='SELECT * FROM tasks';
    // const res = await this.pool.query(query);
    // return res.rows;
  }

  async findOne (id) {
    const customer = await Customer.findByPk(id)
    if (!customer) {
      throw notFound('Customer not found')
    }
    return customer
  }

  async create (data) {
    const newCustomer = await Customer.create(data, {
      include: ['user']
    })
    return newCustomer
  }

  async update (id, changes) {
    const customer = await this.findOne(id)
    const res = await customer.update(changes)
    return res
  }

  async delete (id) {
    const customer = await this.findOne(id)
    await customer.destroy()
    return { id }
  }
}

export default CustomersService
