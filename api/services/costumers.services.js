import { faker } from '@faker-js/faker'
// import { pool } from "../lib/postgres.pool.js";
import { Costumer } from '../db/models/costumer.model.js'
import { User } from '../db/models/user.model.js'
import { notFound } from '@hapi/boom'

class CostumersService {
  constructor () {
    this.costumers = []
    this.generate()
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  generate () {
    const limit = 5
    for (let index = 0; index < limit; index++) {
      this.costumers.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email()
      })
    };
  }

  async find () {
    const res = await Costumer.findAll({
      include: ['user']
    })
    return res

    // const query ='SELECT * FROM tasks';
    // const res = await this.pool.query(query);
    // return res.rows;
  }

  async findOne (id) {
    const costumer = await Costumer.findByPk(id)
    if (!costumer) {
      throw notFound('Costumer not found')
    }
    return costumer
  }

  async create (data) {
    const newCostumer = await Costumer.create(data, {
      include: ['user']
    })
    return newCostumer
  }

  async update (id, changes) {
    const costumer = await this.findOne(id)
    const res = await costumer.update(changes)
    return res
  }

  async delete (id) {
    const costumer = await this.findOne(id)
    await costumer.destroy()
    return { id }
  }
}

export default CostumersService
