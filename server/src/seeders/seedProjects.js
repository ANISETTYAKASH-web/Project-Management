import { faker } from "@faker-js/faker";

// CJS
// const { faker } = require("@faker-js/faker");

const names = faker.helpers.uniqueArray(faker.word.sample, 25);
let i = 0;

const projects = faker.helpers.multiple(
  () => ({
    name: names[i++],
    description: faker.commerce.productDescription(),
    budget: faker.finance.amount(),
  }),
  { count: 20 }
);
export default projects;
