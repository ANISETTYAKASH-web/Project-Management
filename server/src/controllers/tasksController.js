import { isAuthorized } from "../services/projectServices.js";
import {
  getAllTask,
  getTaskByName,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasksService.js";
import AppError from "../utils/AppError.js";
const getAllTasks = async (req, res, next) => {
  const { project_id } = req.query;
  const UserId = req.user.user_id;
  try {
    const isMember = await isAuthorized({
      User: UserId,
      Project: project_id,
    });
    if (!isMember) {
      return next(
        new AppError("You are not authorized to access this project", 401)
      );
    }
    const tasks = await getAllTask({ User: UserId, Project: project_id });
    if (!tasks) {
      next(new AppError("Tasks are Empty. Please add tasks.", 404));
    }
    res.status(200).json({ success: true, message: "Success", tasks: tasks });
  } catch (error) {
    next(new AppError("Internal Server Error", 500, error));
  }
};
const getTasksByName = async (req, res, next) => {
  const { name } = req.body;
  const { project_id } = req.query;

  const UserId = req.user.user_id;
  if (!name) {
    return next(new AppError("Insufficient Details", 400));
  }
  try {
    const isMember = await isAuthorized({
      User: UserId,
      Project: project_id,
    });
    if (!isMember) {
      return next(
        new AppError("You are not authorized to access this project", 401)
      );
    }

    const task = await getTaskByName({
      name: name,
      User: UserId,
      Project: project_id,
    });
    if (!task) {
      return next(new AppError("Tasks are Empty. Please add tasks.", 404));
    }
    res.status(200).json({ success: true, message: "Success", tasks: task });
  } catch (error) {
    next(new AppError("Internal Server Error", 500, error));
  }
};

const createTasks = async (req, res, next) => {
  const { name, status } = req.body;
  const { project_id } = req.query;
  if (!name) {
    return next(new AppError("Insufficient Details", 400));
  }
  const UserId = req.user.user_id;
  try {
    const task = { name: name, User: UserId, Project: project_id };
    if (status) task.status = status;
    // if (user) task.User = user;
    // if (project) task.Project = project;
    const newTask = await createTask(task);
    res.status(200).json({ success: true, message: "Success", tasks: newTask });
  } catch (error) {
    next(new AppError("Internal Server Error", 500, error));
  }
};

const updateTasks = async (req, res, next) => {
  const { name, status } = req.body;
  const UserId = req.user.user_id;
  const { project_id } = req.query;
  if (!name || !status) {
    return next(new AppError("Insufficient Details", 400));
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
      return next(
        new AppError("You are not authorized to access this project", 401)
      );
    }

    const check = getTaskByName({
      name: name,
      User: UserId,
      Project: project_id,
    });
    if (check.length === 0) {
      return next(new AppError("Task doesn't exist", 404));
    }
    const tasks = await updateTask(task);
    res
      .status(200)
      .json({ success: true, message: "Successfully Updated", task: tasks });
  } catch (error) {
    next(new AppError("Internal Server Error", 500, error));
  }
};

const deleteTasks = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new AppError("Insufficient Details", 400));
  }
  const { project_id } = req.query;
  const UserId = req.user.user_id;
  try {
    const isMember = await isAuthorized({
      User: UserId,
      Project: project_id,
    });
    if (!isMember) {
      return next(
        new AppError("You are not authorized to access this project", 401)
      );
    }

    const check = getTaskByName({
      name: name,
      User: UserId,
      Project: project_id,
    });
    if (check.length === 0) {
      // return res.status(401).json({ message: "Task Doesn't Exist" });
      return next(new AppError("Task doesn't exist", 404));
    }

    // console.log(check);
    const task = { name: name, User: UserId, Project: project_id };

    const deletedTasks = await deleteTask(task);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
      task: deletedTasks,
    });
  } catch (error) {
    next(new AppError("Internal Server Error", 500, error));
  }
};
export { getAllTasks, getTasksByName, createTasks, updateTasks, deleteTasks };
