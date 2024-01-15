import express from "express";

import * as projectsController from "../Controllers/projectsController.js";

export const projectsRoutes = express.Router();

projectsRoutes.get("/", projectsController.getProjects);

projectsRoutes.get(
  "/difficulty/:level",
  projectsController.getProjectsByDifficulty
);

projectsRoutes.get("/language/:lang", projectsController.getProjectsByLanguage);

projectsRoutes.get("/:id", projectsController.getProjectById);

projectsRoutes.post("/", projectsController.createProject);

projectsRoutes.delete("/:id", projectsController.deleteProjectById);
