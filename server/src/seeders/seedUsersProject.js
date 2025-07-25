import { faker } from "@faker-js/faker";

export default function createFakeUserProjects(userIds, projectIds) {
  return faker.helpers.multiple(
    () => ({
      User: userIds[Math.floor(Math.random() * userIds.length)],
      Project: projectIds[Math.floor(Math.random() * projectIds.length)],
    }),
    { count: 20 }
  );
}
