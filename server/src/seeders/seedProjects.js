import { faker } from "@faker-js/faker";

// CJS
// const { faker } = require("@faker-js/faker");

const names = faker.helpers.uniqueArray(faker.word.sample, 25);
let i = 0;

const projects = faker.helpers.multiple(
  () => ({
    name: names[i++], // will generate 1000 unique email addresses
    description: faker.commerce.productDescription(), // 'Featuring Phosphorus-enhanced technology, our Fish offers unparalleled Modern performance'
    teamName: faker.company.buzzNoun(), // 'paradigms'
    budget: faker.finance.amount(), // '617.87'}), {
  }),
  { count: 20 }
);
export default projects;
