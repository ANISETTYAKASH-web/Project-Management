import Projects from "../models/projectModel.js";
import userProjects from "../models/usersProject.Model.js";
export async function getAllProjects(data) {
  const res = await userProjects.find(data).populate("Project");
  // console.log(res);
  return res.map((project) => project.Project);
}
export async function getProjectByName(name, user) {
  // return await Projects.find({ name: name });
  const res = await userProjects
    .find({ User: user.user_id })
    .populate("Project");
  // console.log("user projectss", res);
  const ans = res.find((project) => {
    // console.log(project.Project);
    // console.log(name);
    if (project.Project.name == name) {
      // console.log("project", project);
      return project;
    }
  });
  // console.log("ans", ans);
  return ans;
}

//here data is a object
export async function createProject(data, user) {
  const newProject = await Projects.create(data);
  await userProjects.create({ User: user.user_id, Project: newProject._id });
  return newProject;
}
export async function updateProject(filter, data) {
  // console.log(data);
  return await Projects.updateOne(filter, data);
}
export async function deleteProject(data, project_id) {
  // console.log(data);
  const delet = await Projects.deleteOne(data);
  // console.log(delet);
  await userProjects.deleteMany({ Project: project_id });
  return delet;
}
//used in tasks(making sure that user is authorized to get tasks from particular project)
export async function isAuthorized(data) {
  return await userProjects.findOne(data);
}
export async function getProjectByUser(project_id, user_id) {
  return userProjects.findOne({ Project: project_id, User: user_id });
}
export async function addUsersToProject(project_id, user_id) {
  return await userProjects.create({
    User: user_id,
    Project: project_id,
    Role: "member",
  });
}
export async function getNameFromId(project_id) {
  const ans = await Projects.findOne({
    _id: project_id,
  });
  return ans;
}
