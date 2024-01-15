import { resetProjectTables } from "../helpers.js";
import { pool } from "../index.js";
import { seedData } from "../seedData.js";

try {
  const insertedRows = await resetProjectTables(seedData);
  console.log("Reset project table", insertedRows);
} catch (e) {
  console.error(e);
  console.error("Failed to reset tables");
} finally {
  await pool.end();
}