import {
  getAllProjects,
  getProjectByName,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectServices.js";
const allProjects = async (req, res) => {
  const user = req.user;
  try {
    const projects = await getAllProjects({ User: user.user_id });
    if (projects.length === 0) {
      return res.status(200).json({ message: "no projects available" });
    }
    res.status(200).json({ projects: projects });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const projectByName = async (req, res) => {
  try {
    const { name } = req.body;
    const user = req.user;
    const project = await getProjectByName(name, user);
    if (project === undefined) {
      return res.json({ message: "Project with name not found" });
    }

    res.status(200).json({ project: project });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};

const createProjects = async (req, res) => {
  const { name, description, budget } = req.body;
  const user = req.user;
  const projectData = {};
  if (!name) {
    return res.status(400).json({ message: "Insufficient Details" });
  }
  if (description) projectData.description = description;
  if (budget) projectData.budget = budget;
  projectData.name = name;

  try {
    const alreadyAvailable = await getProjectByName(name, user);
    if (alreadyAvailable !== undefined) {
      return res
        .status(401)
        .json({ message: "Project with that name already exists" });
    }
    const newProject = await createProject(projectData, user);
    res
      .status(201)
      .json({ message: "Project created Succesfully yooo", data: newProject });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const updateProjects = async (req, res) => {
  const { name, description, budget } = req.body;
  const user = req.user;
  if (!name) {
    return res.status(400).json({ message: "Insufficient Details" });
  }
  const update = {};
  if (description) update.description = description;
  if (budget) update.budget = budget;
  try {
    //checking if project is there to update it
    const check = await getProjectByName(name, user);
    if (check === undefined) {
      return res
        .status(401)
        .json({ message: "Project with that name doesn't exists" });
    }

    if (check.Role !== "owner") {
      return res.status(401).json({ message: "you are not authorized" });
    }
    const updated = await updateProject({ name }, update);
    res.status(200).json({ message: "Updated Successful", update: updated });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};
const deleteProjects = async (req, res) => {
  const { name } = req.body;
  const user = req.user;
  if (!name) {
    return res.status(400).json({ message: "Insufficient Details" });
  }
  try {
    const check = await getProjectByName(name, user);
    if (check === undefined) {
      return res
        .status(401)
        .json({ message: "Project with that name doesn't exists" });
    }
    // console.log("check", check.Role);
    if (check.Role !== "owner") {
      return res.status(401).json({ message: "you are not authorized" });
    }
    const deleted = await deleteProject({ name: name }, check.Project._id);
    res.status(200).json({ message: "Deleted Successful", data: deleted });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export {
  allProjects,
  projectByName,
  updateProjects,
  deleteProjects,
  createProjects,
};
