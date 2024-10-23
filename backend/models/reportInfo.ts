import pool from "../config/database";
import { Report } from "./reportModel"; 
import { Evaluation} from "./evaluationModel"; 
import { Topic } from "./topicModel"; 

// Get report info by ID with evaluations and topics
export const getReportInfoById = async (
  id: number
): Promise<{
  report: Report | null;
  evaluations: Evaluation[];
  topics: Topic[];
} | null> => {
  const query = `
    SELECT r.*, e.*, t.*
    FROM reports r
    LEFT JOIN evaluations e ON r.id = e.report_id
    LEFT JOIN topics t ON r.id = t.report_id
    WHERE r.id = $1
  `;

  const result = await pool.query(query, [id]);

  if (result.rows.length === 0) {
    return null; // Report not found
  }
  // Populate report, evaluations, and topics
  const evaluations: Evaluation[] = [];
  const topics: Topic[] = [];
  const report: Report = {
    id: result.rows[0].id,
    title: result.rows[0].title,
    summary: result.rows[0].summary,
    content: result.rows[0].content,
    evaluation: result.rows[0].evaluation,
    created_at: result.rows[0].created_at,
  };

  for (const row of result.rows) {
    if (row.evaluation) {
      evaluations.push({
        id: row.evaluation_id,
        report_id: row.report_id,
        comments: row.comments,
        status: row.status,
        created_at: row.created_at,
      });
    }
    if (row.topic) {
      topics.push({
        id: row.topic_id,
        report_id: row.report_id,
        topic: row.topic,
        created_at: row.created_at,
      });
    }
  }

  return { report, evaluations, topics };
};
