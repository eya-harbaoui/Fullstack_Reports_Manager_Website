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
  } catch (err) {
    console.error("error while conntecting to database :", err);
    throw err;
  }
};
export default pool;
