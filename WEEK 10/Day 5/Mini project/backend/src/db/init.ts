import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pool } from "./pool";

async function initializeDatabase(): Promise<void> {
  const schemaPath = resolve(process.cwd(), "src", "db", "schema.sql");
  const schema = await readFile(schemaPath, "utf8");
  await pool.query(schema);
  console.log("Database schema initialized.");
}

initializeDatabase()
  .catch((error: unknown) => {
    console.error("Database initialization failed.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
