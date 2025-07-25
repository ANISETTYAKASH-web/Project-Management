import { faker } from "@faker-js/faker";

function createRandomUser() {
  return {
    user_name: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

const users = faker.helpers.multiple(createRandomUser, {
  count: 20,
});
export default users;
