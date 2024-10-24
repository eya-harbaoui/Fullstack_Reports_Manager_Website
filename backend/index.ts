//import packages
import express, { Application } from "express";
import { DBConnection } from "./config/database";
import reportRoutes from "./routes/report.route"; // Chemin vers ton fichier routeur

const app: Application = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.use("/reports", reportRoutes); 

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
