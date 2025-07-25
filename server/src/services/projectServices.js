import Projects from "../models/projectModel.js";
export async function getAllProjects() {
  return await Projects.find({});
}
export async function getProjectByName(name) {
  return await Projects.find({ name: name });
}
export async function authorized(data) {
  return await Projects.find(data);
}
//here data is a object
export async function createProject(data) {
  return await Projects.create(data);
}
export async function updateProject(filter, data) {
  return await Projects.updateOne(filter, data);
}
export async function deleteProject(data) {
  return await Projects.deleteOne(data);
}
