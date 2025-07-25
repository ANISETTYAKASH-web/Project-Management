//this file is used to take generated data from seedUsers and seedProjects and insert them into db
import "dotenv/config";
import mongoose from "mongoose";
import users from "./seedUsers.js";
import projects from "./seedProjects.js";
import User from "../models/usersModel.js";
import Project from "../models/projectModel.js";
import Tasks from "../models/tasksModel.js";
import UsersProject from "../models/usersProject.Model.js";
import createFakeTasks from "./seedTasks.js";
import createFakeUserProjects from "./seedUsersProject.js";
await mongoose.connect(process.env.MONGO_DB_URL);
console.log("connected "); //database connected
// inserting into USERS
await User.deleteMany({});
await User.insertMany(users);
console.log("INSERTTED 20 fake usrers ");
// INSERTING IN TO PROJECTS
await Project.deleteMany({});
await Project.insertMany(projects);
console.log("INSERTED 20 fake projects ");
// INSERTING into TASKS
const userIds = await User.distinct("_id");
const projectIds = await Project.distinct("_id");
const tasks = createFakeTasks(userIds, projectIds);
await Tasks.deleteMany({});
await Tasks.insertMany(tasks);
console.log("INSERTED fake 20 tasks with real user and project IDS");
//INSERTING into userProjects Model
await UsersProject.deleteMany({});
await UsersProject.insertMany(createFakeUserProjects(userIds, projectIds));
console.log("CREATED fake 20 relationships with real user and project IDS");
