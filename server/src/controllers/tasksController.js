import { isAuthorized } from "../services/projectServices.js";
import {
  getAllTask,
  getTaskByName,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasksService.js";
const getAllTasks = async (req, res) => {
  const { project_id } = req.query;
  const UserId = req.user.user_id;
  console.log(UserId);
  console.log(project_id);
  try {
    const isMember = await isAuthorized({
      User: UserId,
      Project: project_id,
    });
    console.log(isMember);
    if (!isMember) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this project" });
    }
    const tasks = await getAllTask({ User: UserId, Project: project_id });
    if (!tasks) {
      return res
        .status(200)
        .json({ message: "Tasks are Empty Please Add tasks" });
    }
    res.status(200).json({ message: "Success", tasks: tasks });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getTasksByName = async (req, res) => {
  const { name } = req.body;
  const { project_id } = req.query;

  const UserId = req.user.user_id;
  if (!name) {
    return res.status(401).json({ message: "Insufficient Details" });
  }
  try {
    const isMember = await isAuthorized({
      User: UserId,
      Project: project_id,
    });
    if (!isMember) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this project" });
    }

    const task = await getTaskByName({
      name: name,
      User: UserId,
      Project: project_id,
    });
    if (!task) {
      return res
        .status(200)
        .json({ message: "Tasks are Empty Please Add tasks" });
    }
    res.status(200).json({ message: "Success", tasks: task });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const createTasks = async (req, res) => {
  const { name, status } = req.body;
  const { project_id } = req.query;
  if (!name) {
    return res.status(401).json({ message: "Insufficient Details" });
  }
  const UserId = req.user.user_id;
  try {
    const task = { name: name, User: UserId, Project: project_id };
    if (status) task.status = status;
    // if (user) task.User = user;
    // if (project) task.Project = project;
    const newTask = await createTask(task);
    res.status(200).json({ message: "Success", tasks: newTask });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateTasks = async (req, res) => {
  const { name, status } = req.body;
  const UserId = req.user.user_id;
  const { project_id } = req.query;
  if (!name || !status) {
    return res.status(401).json({ message: "Insufficient Details" });
  }

  const task = { name: name, User: UserId, Project: project_id };
  if (status) task.status = status;
  // if (project) task.Project = project;
  try {
    const isMember = await isAuthorized({
      User: UserId,
      Project: project_id,
    });
    if (!isMember) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this project" });
    }

    const check = getTaskByName({
      name: name,
      User: UserId,
      Project: project_id,
    });
    if (check.length === 0) {
      return res.status(401).json({ message: "Task Doesn't Exist" });
    }
    const tasks = await updateTask(task);
    res.status(200).json({ message: "Successfully Updated", task: tasks });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteTasks = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(401).json({ message: "Insufficient Details" });
  }
  const { project_id } = req.query;
  const UserId = req.user.user_id;
  try {
    const isMember = await isAuthorized({
      User: UserId,
      Project: project_id,
    });
    if (!isMember) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this project" });
    }

    const check = getTaskByName({
      name: name,
      User: UserId,
      Project: project_id,
    });
    if (check.length === 0) {
      return res.status(401).json({ message: "Task Doesn't Exist" });
    }

    // console.log(check);
    const task = { name: name, User: UserId, Project: project_id };

    const deletedTasks = await deleteTask(task);
    res
      .status(200)
      .json({ message: "Successfully Deleted", task: deletedTasks });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export { getAllTasks, getTasksByName, createTasks, updateTasks, deleteTasks };
