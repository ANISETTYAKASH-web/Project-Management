import {
  getAllProjects,
  getProjectByName,
  createProject,
  updateProject,
  deleteProject,
  addUsersToProject,
  getProjectByUser,
  getNameFromId,
} from "../services/projectServices.js";
import AppError from "../utils/AppError.js";
const allProjects = async (req, res, next) => {
  const user = req.user;
  try {
    const projects = await getAllProjects({ User: user.user_id });
    if (projects.length === 0) {
      return next(new AppError("no projects available", 404));
    }
    res.status(200).json({ success: true, projects: projects });
  } catch (error) {
    next(new AppError("Internal Server Error", 500, error));
  }
};
const projectByName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = req.user;
    const project = await getProjectByName(name, user);
    if (project === undefined) {
      // return res.json({ message: "Project with name not found" });
      return next(new AppError("Project with name not found", 404));
    }

    res.status(200).json({ success: true, project: project });
  } catch (error) {
    // res.status(404).json({ message: "Internal Server Error" });
    next(new AppError("Internal Server Error", 500, error));
  }
};

const createProjects = async (req, res, next) => {
  const { name, description, budget } = req.body;
  const user = req.user;
  const projectData = {};
  if (!name) {
    // return res.status(400).json({ message: "Insufficient Details" });
    return next(new AppError("Insufficient Details", 400));
  }
  if (description) projectData.description = description;
  if (budget) projectData.budget = budget;
  projectData.name = name;

  try {
    const alreadyAvailable = await getProjectByName(name, user);
    if (alreadyAvailable !== undefined) {
      // return res
      //   .status(401)
      //   .json({ message: "Project with that name already exists" });

      return next(new AppError("Project with that name already exists", 409));
    }
    const newProject = await createProject(projectData, user);
    res.status(201).json({
      success: true,
      message: "Project created Succesfully",
      data: newProject,
    });
  } catch (error) {
    next(new AppError("Internal Server Error", 500, error));
  }
};
const updateProjects = async (req, res, next) => {
  const { name, description, budget } = req.body;
  const user = req.user;
  if (!name) {
    // return res.status(400).json({ message: "Insufficient Details" });
    return next(new AppError("Insufficient Details", 400));
  }
  const update = {};
  if (description) update.description = description;
  if (budget) update.budget = budget;
  try {
    //checking if project is there to update it
    const check = await getProjectByName(name, user);
    if (check === undefined) {
      // return res
      //   .status(401)
      //   .json({ message: "Project with that name doesn't exists" });
      return next(new AppError("Project with that name doesn't exists", 409));
    }

    if (check.Role !== "owner") {
      // return res.status(401).json({ message: "you are not authorized" });
      return next(new AppError("you are not authorized", 401));
    }
    const updated = await updateProject({ name }, update);
    res
      .status(200)
      .json({ success: true, message: "Updated Successful", update: updated });
  } catch (error) {
    next(new AppError("Internal Server Error", 500, error));
  }
};
const deleteProjects = async (req, res, next) => {
  const { name } = req.body;
  const user = req.user;
  if (!name) {
    // return res.status(400).json({ message: "Insufficient Details" });
    return next(new AppError("Insufficient Details", 400));
  }
  try {
    const check = await getProjectByName(name, user);
    if (check === undefined) {
      // return res
      //   .status(401)
      //   .json({ message: "Project with that name doesn't exists" });
      return next(new AppError("Project with that name doesn't exists", 409));
    }
    // console.log("check", check.Role);
    if (check.Role !== "owner") {
      // return res.status(401).json({ message: "you are not authorized" });
      return next(new AppError("you are not authorized", 401));
    }
    const deleted = await deleteProject({ name: name }, check.Project._id);
    res
      .status(200)
      .json({ success: true, message: "Deleted Successful", data: deleted });
  } catch (error) {
    next(new AppError("Internal Server Error", 500, error));
  }
};
const addUserToProject = async (req, res, next) => {
  const project_id = req.params.projectId;
  const user = req.user;
  const { user_id } = req.body;
  try {
    const project = await getNameFromId(project_id);
    if (!project) {
      return next(new AppError("Project with that id doesn't exists", 409));
    }
    const name = project.name;
    const check = await getProjectByName(name, user);

    // if (check === undefined) {
    //   // return res
    //   //   .status(401)
    //   //   .json({ message: "Project with that name doesn't exists" });
    //   return next(new AppError("Project with that name doesn't exists", 409));
    // }
    // console.log("check", check.Role);
    if (check.Role !== "owner") {
      // return res.status(401).json({ message: "you are not authorized" });
      return next(new AppError("you are not authorized", 401));
    }
    const alreadyUser = await getProjectByUser(project_id, user_id);
    if (alreadyUser) {
      return next(new AppError("Already User is part of the project", 409));
    }
    const addUser = await addUsersToProject(project_id, user_id);
    res
      .status(200)
      .json({ success: true, message: "User added to the project", addUser });
  } catch (error) {
    next(new AppError("Internal Server Error", 500, error));
  }
};
export {
  allProjects,
  projectByName,
  updateProjects,
  deleteProjects,
  createProjects,
  addUserToProject,
};
