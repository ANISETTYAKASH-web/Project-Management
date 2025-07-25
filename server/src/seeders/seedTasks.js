import { faker } from "@faker-js/faker";

export default function createFakeTasks(userIds, projectIds) {
  return faker.helpers.multiple(
    () => ({
      name: faker.animal.petName(),
      User: userIds[Math.floor(Math.random() * userIds.length)],
      Project: projectIds[Math.floor(Math.random() * projectIds.length)],
    }),
    { count: 20 }
  );
}
