import express from "express";
import {
  allProjects,
  projectByName,
  updateProjects,
  deleteProjects,
  createProjects,
} from "../controllers/projectController.js";
const projectRouter = express.Router();

projectRouter.get("/getAllProjects", allProjects);
projectRouter.get("/getProject", projectByName);
projectRouter.put("/update", updateProjects);
projectRouter.post("/create", createProjects);
projectRouter.delete("/delete", deleteProjects);

export default projectRouter;
