import {
  getAllTask,
  getTaskByName,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasksService.js";
const getAllTasks = async (req, res) => {
  try {
    const tasks = await getAllTask();
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
  if (!name) {
    return res.status(401).json({ message: "Insufficient Details" });
  }
  try {
    const task = await getTaskByName({ name: name });
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
  const { name, status, user, project } = req.body;
  if (!name) {
    return res.status(401).json({ message: "Insufficient Details" });
  }
  try {
    const task = { name: name };
    if (status) task.status = status;
    if (user) task.User = user;
    if (project) task.Project = project;
    const newTask = await createTask(task);
    res.status(200).json({ message: "Success", tasks: newTask });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateTasks = async (req, res) => {
  const { name, status, user, project } = req.body;
  if (!name || !status || !project) {
    return res.status(401).json({ message: "Insufficient Details" });
  }
  const task = { name: name, status: status };
  if (user) task.User = user;
  if (project) task.Project = project;
  try {
    const check = getTaskByName({ name: name });
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
  const { name, status, user, project } = req.body;
  if (!name || !project) {
    return res.status(401).json({ message: "Insufficient Details" });
  }
  try {
    const task = { name: name, Project: project };
    if (user) task.User = user;
    // if (project) task.Project = project;
    console.log(task);
    const check = getTaskByName({ name: name });

    if (check.length === 0) {
      return res.status(401).json({ message: "Task Doesn't Exist" });
    }
    console.log(check);
    const tasks = await deleteTask(task);
    res.status(200).json({ message: "Successfully Deleted", task: tasks });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export { getAllTasks, getTasksByName, createTasks, updateTasks, deleteTasks };
