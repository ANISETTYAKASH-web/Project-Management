import express from "express";
import {
  allProjects,
  projectByName,
  updateProjects,
  deleteProjects,
  createProjects,
} from "../controllers/projectController.js";
import AuthorizeUser from "../middleware/auth.middleware.js";
const projectRouter = express.Router();

projectRouter.get("/getAllProjects", AuthorizeUser, allProjects);
projectRouter.get("/getProject", AuthorizeUser, projectByName);
projectRouter.put("/update", AuthorizeUser, updateProjects);
projectRouter.post("/create", AuthorizeUser, createProjects);
projectRouter.delete("/delete", AuthorizeUser, deleteProjects);

export default projectRouter;
