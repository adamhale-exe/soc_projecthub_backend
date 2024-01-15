import { pool } from "./index.js";

/**
 * @param {{ task: string; completed: boolean; }[]} data - An array of todo objects without ids
 */
export async function resetProjectTables(data) {
  await pool.query(`
    DROP TABLE IF EXISTS projects;
    CREATE TABLE projects (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL,
      short_description VARCHAR(255) NOT NULL,
      long_description VARCHAR(255) NOT NULL,
      language VARCHAR(255) NOT NULL,
      topic VARCHAR(255),
      difficulty VARCHAR(255) NOT NULL,
      url VARCHAR(255)
    );`);

  const inserted = await pool.query(
    `INSERT INTO projects (
      name, short_description, long_description, language, topic, difficulty, url
    ) (
      SELECT name, short_description, long_description, language, topic, difficulty, url
      FROM json_populate_recordset(NULL::projects, $1::JSON)
    )
    RETURNING *;`,
    [JSON.stringify(data)]
  );

  return inserted.rows;
}
