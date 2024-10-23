import pool from "../config/database";

export interface Topic {
  id?: number;
  report_id: number;
  topic?: string;
  created_at?: Date;
}
// CRUD topics

// create topic for a report
export const createTopic = async (
  topic: Topic
): Promise<void> => {
  const query = `
    INSERT INTO topics (report_id, topic)
    VALUES ($1, $2) RETURNING *`;
  const values = [topic.report_id, topic.topic];
  await pool.query(query, values);
};

//get topics for a report
export const getTopicsForReport = async (
  reportId: number
): Promise<Topic[]> => {
  const query = `SELECT * FROM topics WHERE report_id = $1`;
  const result = await pool.query(query, [reportId]);
  return result.rows;
};

// Update topic by ID
export const updateTopics = async (
  topic: Topic,
  id: number
): Promise<void> => {
  const query = `
    UPDATE evaluations
    SET topic = $1 WHERE id = $2`;
  const values = [topic.topic,id];
  await pool.query(query, values);
};

// Delete a topic for a report by ID
export const deleteTopic = async (id: number): Promise<void> => {
  const query = `DELETE FROM topics WHERE id = $1`;
  await pool.query(query, [id]);
};
