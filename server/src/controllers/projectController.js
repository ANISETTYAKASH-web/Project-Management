import e from "express";
import {
  getAllProjects,
  getProjectByName,
  createProject,
  updateProject,
  deleteProject,
  authorized,
} from "../services/projectServices.js";
const allProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();
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
    const projects = await getProjectByName(name);
    if (projects.length === 0) {
      return res.json({ message: "Project with name not found" });
    }
    if (projects.length >= 2) {
      return res.json({
        message: "Multiple projects Found",
        projects: projects,
      });
    }
    res.status(200).json({ projects: projects });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};

const createProjects = async (req, res) => {
  const { name, description, team_name, budget } = req.body;
  const projectData = {};
  if (!name || !team_name) {
    return res.status(400).json({ message: "Insufficient Details" });
  }
  if (description) projectData.description = description;
  if (budget) projectData.budget = budget;
  projectData.name = name;
  projectData.teamName = team_name;
  try {
    const newProject = await createProject(projectData);
    res
      .status(201)
      .json({ message: "Project created Succesfully yoooo", data: newProject });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const updateProjects = async (req, res) => {
  const { name, team_name, description, budget } = req.body;
  if (!name || !team_name) {
    return res.status(400).json({ message: "Insufficient Details" });
  }
  const update = {};
  if (description) update.description = description;
  if (budget) update.budget = budget;
  try {
    //checking if project is there to update it
    const check = await getProjectByName(name);
    if (check.length === 0) {
      return res.status(404).json({ message: "Project Not Found" });
    }
    //checking if he belongs to the same time to update it
    const isAuthorized = await authorized({ name: name, teamName: team_name });
    if (isAuthorized.length === 0) {
      return res.status(404).json({ message: "Team is not Authorized" });
    }
    const updated = await updateProject({ name }, update);
    res.status(200).json({ message: "Updated Successful", update: updated });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};
const deleteProjects = async (req, res) => {
  const { name, team_name, description, budget } = req.body;
  if (!name || !team_name) {
    return res.status(400).json({ message: "Insufficient Details" });
  }
  try {
    const check = await getProjectByName(name);
    if (check.length === 0) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const isAuthorized = await authorized({ name: name, teamName: team_name });
    if (isAuthorized.length === 0) {
      return res.status(404).json({ message: "Team is not Authorized" });
    }
    const deleted = await deleteProject({ name: name });
    res.status(200).json({ message: "Deleted Successful", data: deleted });
  } catch (error) {
    res.status(404).json({ message: "Internal Server Error" });
  }
};
export {
  allProjects,
  projectByName,
  updateProjects,
  deleteProjects,
  createProjects,
};
