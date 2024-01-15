import express from "express";
import morgan from "morgan";

//Importing cors to authorize connection of the two repos
import cors from "cors";

import { projectsRoutes } from "./Routes/projectsRoutes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH"],
  })
);

app.use("/projects", projectsRoutes);

export default app;
