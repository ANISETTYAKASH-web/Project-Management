import Tasks from "../models/tasksModel.js";
import Users from "../models/usersModel.js";
import Projects from "../models/projectModel.js";
export async function getAllTask() {
  return await Tasks.find({});
}
export async function getTaskByName(data) {
  return await Tasks.find(data);
}
export async function createTask(data) {
  //data user,project
  //(username) => (userstable) => (id) => tasktable;
  if (data.User) {
    const user = await Users.findOne({ user_name: data.User });
    if (user === null) throw new Error("User is not found");
    data.User = user._id;
  }
  if (data.Project) {
    const project = await Projects.findOne({ name: data.Project });
    data.Project = project._id;
  }
  await Tasks.create(data);
}

export async function updateTask(data) {
  const res = await Tasks.find({ name: data.name });

  if (data.Project !== undefined) {
    const project = await Projects.findOne({ name: data.Project });
    if (project === null) {
      throw new Error("Project not Found ");
    }
    data.Project = project._id;
    console.log(data.Project);
    console.log(res[0].Project);
    if (String(res[0].Project) !== String(data.Project)) {
      throw new Error(`This task belongs to orher project(${res[0].Project})`);
    }
  }

  return await Tasks.updateOne(data);
}
export async function deleteTask(data) {
  if (data.Project) {
    const project = await Projects.findOne({ name: data.Project });
    if (project === null) {
      throw new Error("There is no such project");
    }
    data.Project = project._id;
  }
  const res = await Tasks.find(data);

  if (res === null) {
    throw new Error("There is no such task in this project");
  }
  if (String(res[0].Project) !== String(data.Project)) {
    throw new Error(`This task belongs to orher project(${res[0].Project})`);
  }
  return await Tasks.deleteMany(data);
}
