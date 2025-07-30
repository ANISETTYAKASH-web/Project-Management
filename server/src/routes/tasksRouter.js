import express from "express";
import {
  createTasks,
  updateTasks,
  deleteTasks,
  getAllTasks,
  getTasksByName,
} from "../controllers/tasksController.js";
import AuthorizeUser from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { taskSchema } from "../validators/taskValidator.js";

const TaskRouter = express.Router();
TaskRouter.get("/getAllTasks", AuthorizeUser, getAllTasks);
TaskRouter.get(
  "/getTask",
  AuthorizeUser,
  validateRequest(taskSchema),
  getTasksByName
);
TaskRouter.post(
  "/create",
  AuthorizeUser,
  validateRequest(taskSchema),
  createTasks
);
TaskRouter.delete(
  "/delete",
  AuthorizeUser,
  validateRequest(taskSchema),
  deleteTasks
);
TaskRouter.put(
  "/update",
  AuthorizeUser,
  validateRequest(taskSchema),
  updateTasks
);
export default TaskRouter;
