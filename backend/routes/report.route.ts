import { Router } from "express";
import {
  createNewReport,
  getAllReports,
  getReportDetails
} from "../controllers/reportController"; 

const router = Router();

// Route to create a report
router.post("/new", createNewReport);

// Route to get all reports
router.get("/", getAllReports);

// Route to get report infos by ID
router.get("/:id", getReportDetails);

export default router;
