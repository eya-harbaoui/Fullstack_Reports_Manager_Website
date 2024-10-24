import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the type for your report data
interface ReportDetails {
  id: number;
  title: string;
  content: string;
  reviewer_comments: string;
  evaluation_status: "Passed" | "Failed" | "Needs Review";
}

interface ReportWithTopics {
  report: ReportDetails; // The report object
  topics: any[]; // Assuming topics is an array; adjust type as needed
}


export const ReportDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the report ID from the URL
  const [reportWithTopics, setReportWithTopics] =
    useState<ReportWithTopics | null>(null); // State to hold the report data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to handle errors

  const fetchReport = async () => {
    try {
      const response = await axios.get<ReportWithTopics>(
        `http://localhost:8000/reports/${id}`
      ); // Fetch the report details
      setReportWithTopics(response.data); // Set the report data in state
    } catch (err: any) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false once fetch is complete
    }
  };

  useEffect(() => {
    fetchReport(); // Fetch the report when the component mounts or the ID changes
  }, [id]); // Dependency array ensures the effect runs when `id` changes

  useEffect(() => {
    console.log("Report details:", reportWithTopics); // Log updated reportWithTopics
  }, [reportWithTopics]); // This effect runs when reportWithTopics updates

  // Conditional rendering based on loading, error, or report data
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-10 mb-4">
      <h1 className="text-3xl font-bold mb-4">Report Details</h1>
      {reportWithTopics ? (
        <Card>
          <CardHeader>
            <CardTitle>{reportWithTopics.report.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-left">
              <strong className="mb-4">Content</strong>
              <p>{reportWithTopics.report.content}</p>
            </div>
            <div className="mb-4 text-left">
              <strong className="mb-4">Evaluation Status</strong>
              <p
                className={`font-bold ${
                  reportWithTopics.report.evaluation_status === "Failed"
                    ? "text-red-500" // Red for failed
                    : reportWithTopics.report.evaluation_status === "Passed"
                    ? "text-green-500" // Green for passed
                    : reportWithTopics.report.evaluation_status ===
                      "Needs Review"
                    ? "text-orange-500"
                    : "text-gray-500"
                }`}
              >
                {reportWithTopics.report.evaluation_status}
              </p>
            </div>
            <div className="mb-4 text-left">
              <strong className="mb-4">Reviewer Comments</strong>
              <p>{reportWithTopics.report.reviewer_comments}</p>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      ) : (
        <p>No report found.</p>
      )}
    </div>
  );
};
