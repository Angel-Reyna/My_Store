import { faker } from '@faker-js/faker';

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url()
      });
    }
  }

  async create(data){
    console.log('Before: ',data);
    const elementosValidos = [ 'name', 'price', 'image' ];
    //Elimina cualquier dato extra
    Object.keys(data).forEach((key) => elementosValidos .includes(key) || delete data[key]);
    console.log('After: ', data);
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise (( resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      },1500);
    });
  }

  async findOne(id){
    const item = this.products.find(item => item.id === id);
    if (item === undefined){
      throw new Error('Product not found');
    }
    return item
  }

  async update(id,changes){
    const index = this.products.findIndex(item => item.id === id);
    console.log("Before update: ", this.products[index]);
    if (index === -1){
      throw new Error('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    console.log("After update: ", this.products[index]);
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    console.log("Before update: ", this.products[index]);
    if (index === -1){
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

export default ProductsService;
