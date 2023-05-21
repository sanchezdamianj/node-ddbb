const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sex: faker.name.sex(),
        image: faker.image.imageUrl(),
      });
    }
  }
  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      sex: faker.name.sex(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    return new Promise((res, rej) => {
      try {
        setTimeout(() => {
          res(this.users);
        }, 1000);
      } catch (error) {
        rej.error(error);
      }
    });
  }

  async findOne(id) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return { id: id, message: `User id: ${id} has been deleted` };
  }
}

module.exports = UsersService;
