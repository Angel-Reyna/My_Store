import {faker} from '@faker-js/faker';
import { getConnection } from "../lib/postgres.js";

class UserService {
  constructor(){
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
      });
    };
  }

  async find() {
    const client = await getConnection();
    const res = await client.query('SELECT * FROM tasks');
    return res.rows;
  }

  findOne(id){
    return this.users.find(user => user.id === id);
  }

  create(data) {
    const elementosValidos = [ 'name', 'lastName', 'email' ];
    //Elimina cualquier dato extra
    Object.keys(data).forEach((key) => elementosValidos .includes(key) || delete data[key]);
    const newUser = {
      id: faker.string.uuid(),
      ...data
    };
    this.users.push(newUser);
    return newUser;
  }

  delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error("product not found");
    }
    this.users.splice(index, 1);
    return {id};
  }
}

export default UserService;
