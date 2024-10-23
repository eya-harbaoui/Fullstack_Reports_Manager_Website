import pool from "../config/database";

// Report interface
export interface Report {
  id?: number; 
  title: string;
  summary: string;
  content: string;
  evaluation: string;
  created_at?: Date; 
}
// CRUD Report 
// create a new report
export const createReport = async (report: Report): Promise<void> => {
  const query = `
    INSERT INTO reports (title, summary, content, evaluation)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [
    report.title,
    report.summary,
    report.content,
    report.evaluation,
  ];
  await pool.query(query, values);
};

// get all reports
export const getReports = async (): Promise<Report[]> => {
  const query = `SELECT * FROM reports`;
  const result = await pool.query(query);
  return result.rows; 
};

// Get a report by ID
export const getReportById = async (id: number): Promise<Report | null> => {
  const query = `SELECT * FROM reports WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows.length > 0 ? result.rows[0] : null; 
};

// Update a report by ID
export const updateReport = async (
  id: number,
  report: Report
): Promise<void> => {
  const query = `
    UPDATE reports
    SET title = $1, summary = $2, content = $3, evaluation = $4
    WHERE id = $5`;
  const values = [
    report.title,
    report.summary,
    report.content,
    report.evaluation,
    id,
  ];
  await pool.query(query, values);
};

// Delete a report by ID
export const deleteReport = async (id: number): Promise<void> => {
  const query = `DELETE FROM reports WHERE id = $1`;
  await pool.query(query, [id]);
};
