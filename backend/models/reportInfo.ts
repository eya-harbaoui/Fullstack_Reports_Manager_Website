import pool from "../config/database";
import { Report } from "./reportModel";
import { Topic } from "./topicModel";

// Get report info by ID with evaluations and topics
export const getReportInfoById = async (
  id: number
): Promise<{
  report: Report | null;
  topics: Topic[];
} | null> => {
  const query = `
    SELECT r.*, e.*, t.*
    FROM reports r
    LEFT JOIN topics t ON r.id = t.report_id
    WHERE r.id = $1ss
  `;

  const result = await pool.query(query, [id]);

  if (result.rows.length === 0) {
    return null; // Report not found
  }
  // Populate report, evaluations, and topics
  const topics: Topic[] = [];
  const report: Report = {
    id: result.rows[0].id,
    title: result.rows[0].title,
    summary: result.rows[0].summary,
    content: result.rows[0].content,
    evaluation_status: result.rows[0].evaluation_status,
    reviewer_comments: result.rows[0].reviewer_comments,
    created_at: result.rows[0].created_at,
  };

  for (const row of result.rows) {
    if (row.topic) {
      topics.push({
        id: row.topic_id,
        report_id: row.report_id,
        topic: row.topic,
        created_at: row.created_at,
      });
    }
  }

  return { report, topics };
};
