import express from "express";
import { DBConnection } from "./config/database";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("welcome to node js server !");
});

// verify Database connection when starting server
const startServer = async () => {
  try {
    await DBConnection();
    app.listen(PORT, () => {
      console.log(`Server working on port ${PORT}`);
    });
  } catch (err) {
    console.error("error while starting server", err);
  }
};
// start server
startServer();
