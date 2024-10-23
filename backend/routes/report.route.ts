import { Router } from "express";
import {
  createNewReport,
  getAllReports,
  getReportDetails
} from "../controllers/reportController"; 

const router = Router();

// Route to create a report
router.post("/reports/new", createNewReport);

// Route to get all reports
router.get("/reports", getAllReports);

// Route to get report infos by ID
router.get("/reports/:id", getReportDetails);

export default router;
