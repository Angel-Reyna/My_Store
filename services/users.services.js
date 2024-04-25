import {faker} from '@faker-js/faker';

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

  find() {
    return this.users;
  }

  findOne(id){
    return this.users.find(user => user.id === id);
  }

  create(data) {
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