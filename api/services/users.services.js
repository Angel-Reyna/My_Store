import { faker } from '@faker-js/faker'
// import { pool } from "../lib/postgres.pool.js";
import { User } from '../db/models/user.model.js'
import { notFound } from '@hapi/boom'

class UserService {
  constructor () {
    this.users = []
    this.generate()
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  async generate () {
    const limit = 5
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email()
      })
    };
  }

  async find () {
    const res = await User.findAll({
      include: ['customer']
    })
    return res

    // const query ='SELECT * FROM tasks';
    // const res = await this.pool.query(query);
    // return res.rows;
  }

  async findOne (id) {
    const user = await User.findByPk(id)
    if (!user) {
      throw notFound('User not found')
    }
    return user
    // return this.users.find(user => user.id === id);
  }

  async create (data) {
    const newUser = await User.create(data)
    return newUser

    // const elementosValidos = [ 'name', 'lastName', 'email' ];
    // //Elimina cualquier dato extra
    // Object.keys(data).forEach((key) => elementosValidos .includes(key) || delete data[key]);
    // const newUser = {
    //   id: faker.string.uuid(),
    //   ...data
    // };
    // this.users.push(newUser);
    // return newUser;
  }

  async update (id, changes) {
    const user = await this.findOne(id)
    const res = await user.update(changes)
    return res
  }

  async delete (id) {
    const user = await this.findOne(id)
    await user.destroy()
    return { id }

    // const index = this.users.findIndex(item => item.id === id);
    // if (index === -1){
    //   throw new Error("product not found");
    // }
    // this.users.splice(index, 1);
    // return {id};
  }
}

export default UserService
