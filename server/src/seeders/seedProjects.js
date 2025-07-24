import { faker } from "@faker-js/faker";

// CJS
// const { faker } = require("@faker-js/faker");

function createRandomProjects() {
  return {
    name: faker.commerce.product(), // 'Computer'
    description: faker.commerce.productDescription(), // 'Featuring Phosphorus-enhanced technology, our Fish offers unparalleled Modern performance'
    teamName: faker.company.buzzNoun(), // 'paradigms'
    budget: faker.finance.amount(), // '617.87'
  };
}

const projects = faker.helpers.multiple(createRandomProjects, {
  count: 20,
});
export default projects;
