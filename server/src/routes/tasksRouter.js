import express from "express";
import {
  createTasks,
  updateTasks,
  deleteTasks,
  getAllTasks,
  getTasksByName,
} from "../controllers/tasksController.js";
import AuthorizeUser from "../middleware/auth.middleware.js";

const TaskRouter = express.Router();
TaskRouter.get("/getAllTasks", AuthorizeUser, getAllTasks);
TaskRouter.get("/getTask", AuthorizeUser, getTasksByName);
TaskRouter.post("/create", AuthorizeUser, createTasks);
TaskRouter.delete("/delete", AuthorizeUser, deleteTasks);
TaskRouter.put("/update", AuthorizeUser, updateTasks);
export default TaskRouter;
