// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "../db/index.js";

export async function getProjects() {
  // Query the database and return all projects
  const queryText = "SELECT * FROM projects";
  const result = await pool.query(queryText);
  return result.rows;
}
//Need to build remaining models:
//get by difficulty
export async function getProjectsByDifficulty(difficulty) {
  // build SQL query
  const queryText = "SELECT * FROM projects WHERE difficulty = $1";
  // send query and store result
  const result = await pool.query(queryText, [`${difficulty}`]);
  return result.rows;
}
//get by language
export async function getProjectsByLanguage(language) {
  // build SQL query
  const queryText = "SELECT * FROM projects WHERE language = $1";
  // send query and store result
  const result = await pool.query(queryText, [`${language}`]);
  return result.rows;
}

//get by ID
export async function getProjectById(id) {
  // build SQL query
  const queryText = "SELECT * FROM projects WHERE id = $1";
  // send query and store result
  const result = await pool.query(queryText, [`${id}`]);
  return result.rows;
}

//add new project
export async function createProject(project) {
  const queryText = `INSERT INTO projects (
      name, short_description, long_description, language, topic, difficulty, url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`;
  const result = await pool.query(queryText, [
    project.name,
    project.short_description,
    project.long_description,
    project.language,
    project.topic,
    project.difficulty,
    project.url,
  ]);
  return result.rows;
}

//delete by id
export async function deleteProjectById(id) {
  const queryText = `DELETE FROM projects 
    WHERE id = $1
    RETURNING *`;
  const result = await pool.query(queryText, [id]);
  return result.rows;
}
