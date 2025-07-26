import express from "express";
import {
  createTasks,
  updateTasks,
  deleteTasks,
  getAllTasks,
  getTasksByName,
} from "../controllers/tasksController.js";

const TaskRouter = express.Router();
TaskRouter.get("/getAllTasks", getAllTasks);
TaskRouter.get("/getTask", getTasksByName);
TaskRouter.post("/create", createTasks);
TaskRouter.delete("/delete", deleteTasks);
TaskRouter.put("/update", updateTasks);
export default TaskRouter;
