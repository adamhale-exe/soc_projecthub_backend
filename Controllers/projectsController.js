//will need to import projects models from /models/porjectModels.js
import * as projectsModel from "../Models/projectsModel.js";
//First request to get hold of all the projects
export async function getProjects(req, res) {
  const projects = await projectsModel.getProjects();
  res.status(200).json({ status: "success", data: projects });
}

//Second request would be to filter projects and get by difficulty
export async function getProjectsByDifficulty(req, res) {
  const difficulty = req.params.level;
  const projects = await projectsModel.getProjectsByDifficulty(difficulty);
  if (!projects) {
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Projects Not Found" } });
  }
  res.status(200).json({ status: "success", data: projects });
}

//Third request would be to filter projects and get by language
export async function getProjectsByLanguage(req, res) {
  const language = req.params.lang;
  const projects = await projectsModel.getProjectsByLanguage(language);
  if (!projects) {
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Projects Not Found" } });
  }
  res.status(200).json({ status: "success", data: projects });
}

//Third request would be to filter projects and get by language
export async function getProjectById(req, res) {
  const id = req.params.id;
  const projects = await projectsModel.getProjectById(id);
  if (!projects) {
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Projects Not Found" } });
  }
  res.status(200).json({ status: "success", data: projects });
}

//Fourth request would create a new project and add it to the DB
export async function createProject(req, res) {
  const data = req.body;
  const project = await projectsModel.createProject(data);
  res.status(201).json({ status: "success", data: project });
}

//Fifth request would delete a project from the DB
export async function deleteProjectById(req, res) {
  const id = req.params.id;
  const project = await projectsModel.deleteProjectById(id);
  if (!project) {
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Project not found" } });
  }
  res.status(200).json({ status: "success", data: project });
}
