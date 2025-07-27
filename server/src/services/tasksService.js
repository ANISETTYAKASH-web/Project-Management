import Tasks from "../models/tasksModel.js";
export async function getAllTask(data) {
  return await Tasks.find(data);
}
export async function getTaskByName(data) {
  return await Tasks.find(data);
}
export async function createTask(data) {
  // data = > {name,User,status,project_id}
  return await Tasks.create(data);
}

export async function updateTask(data) {
  await Tasks.updateMany({ name: data.name }, data);
}
export async function deleteTask(data) {
  return await Tasks.deleteMany(data);
}
