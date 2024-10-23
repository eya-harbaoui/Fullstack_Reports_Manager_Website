import pool from "../config/database";

export interface Evaluation {
  id?: number;
  report_id: number;
  comments?: string;
  status: string;
  created_at?: Date;
}
// CRUD evaluation

// create evaluation for a report 
export const createEvaluation = async (
  evaluation: Evaluation
): Promise<void> => {
  const query = `
    INSERT INTO evaluations (report_id, comments, status)
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [evaluation.report_id, evaluation.comments, evaluation.status];
  await pool.query(query, values);
};

//get evaluations for a report
export const getEvaluationsForReport = async (reportId: number): Promise<Evaluation[]> => {
  const query = `SELECT * FROM evaluations WHERE report_id = $1`;
  const result = await pool.query(query, [reportId]);
  return result.rows; 
};


// Update evaluation by ID
export const updateEvaluation = async (
  evaluation: Evaluation,id : number
): Promise<void> => {
  const query = `
    UPDATE evaluations
    SET comments = $1, status = $2 WHERE id = $3`;
  const values = [
    evaluation.comments,
    evaluation.status,
    id
  ];
  await pool.query(query, values);
};

// Delete an evaluation for a report by ID
export const deleteEvaluation = async (id: number): Promise<void> => {
  const query = `DELETE FROM evaluations WHERE id = $1`;
  await pool.query(query, [id]);
};
