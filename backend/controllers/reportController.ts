import { Request, Response } from "express";
import { createReport, getReports } from "../models/reportModel";
import { Report } from "../models/reportModel"; 
import {getReportInfoById} from "../models/reportInfo"
// Create a new report
export const createNewReport = async (req: Request, res: Response) => {
  try {
    const report: Report = req.body;
    await createReport(report);
    res.status(201).json({ message: "Report created successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to create report." });
  }
};
// get all reports 
export const getAllReports = async (req : Request , res : Response) =>{
    try {
        const reports = await getReports();
        res.status(200).json(reports);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get reports." });
    }
}
//get report infos by id 
export const getReportDetails = async (req: Request, res: Response): Promise<void> => {
  const reportId = parseInt(req.params.id, 10);
  try {
    const reportInfo = await getReportInfoById(reportId);

    if (!reportInfo) {
      res.status(404).json({ message: 'Report not found' });
      return;
    }

    res.status(200).json(reportInfo);
  } catch (error) {
    console.error('Error fetching report details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

