import express from "express";
import {
  allProjects,
  projectByName,
  updateProjects,
  deleteProjects,
  createProjects,
  addUserToProject,
} from "../controllers/projectController.js";
import AuthorizeUser from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { projectSchema } from "../validators/projectValidators.js";
const projectRouter = express.Router();

projectRouter.get("/getAllProjects", AuthorizeUser, allProjects);
projectRouter.get(
  "/getProject",
  AuthorizeUser,
  validateRequest(projectSchema),
  projectByName
);
projectRouter.post(
  "/create",
  AuthorizeUser,
  validateRequest(projectSchema),
  createProjects
);
projectRouter.put(
  "/update",
  AuthorizeUser,
  validateRequest(projectSchema),
  updateProjects
);

projectRouter.delete(
  "/delete",
  AuthorizeUser,
  validateRequest(projectSchema),
  deleteProjects
);
projectRouter.post("/addUser/:projectId", AuthorizeUser, addUserToProject);
export default projectRouter;
