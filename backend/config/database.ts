//import packages
import { Pool } from "pg";
import dotenv from "dotenv";

//use the environment variables in the config/.env file : just make sure to replace them with your own
dotenv.config();

// create a postgresql pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
});

// function to verify that the database is connected
export const DBConnection = async ():Promise<void> => {
  try {
    await pool.query("SELECT 1");
    console.log("connected to database with success.");
    // Call the function to create tables
    await createTables();
  } catch (err) {
    console.error("error while conntecting to database :", err);
    throw err;
  }
};

// function to create our tables 
const createTables = async (): Promise<void> => {
  const createReportsTable = `
    CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        evaluation VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  const createEvaluationsTable = `
    CREATE TABLE IF NOT EXISTS evaluations (
        id SERIAL PRIMARY KEY,
        report_id INT REFERENCES reports(id) ON DELETE CASCADE,
        comments TEXT,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  const createTopicsTable = `
    CREATE TABLE IF NOT EXISTS topics (
        id SERIAL PRIMARY KEY,
        report_id INT REFERENCES reports(id) ON DELETE CASCADE,
        topic VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  try {
    await pool.query(createReportsTable);
    await pool.query(createEvaluationsTable);
    await pool.query(createTopicsTable);
    console.log("Tables created successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
    throw err;
  }
};

export default pool;
