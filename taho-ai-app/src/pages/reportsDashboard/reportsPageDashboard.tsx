import { useEffect, useState } from "react";
import { Report, columns } from "./columns";
import { DataTable } from "./data-table";
import {Button} from "@/components/ui/button";

async function getData(): Promise<Report[]> {
  // Fetch data from your API here.
  return [
    {
      id: 2,
      title: "Annual Sales Performance Analysis 2023",
      summary:
        "This report provides a detailed analysis of the sales performance for 2023, focusing on key sales metrics, regional performance, and product line contributions. The report also includes recommendations for improving sales strategies.",
      evaluation_status: "Needs Review",
    },
    {
      id: 3,
      title: "Cybersecurity Incident Response Audit Q3 2023",
      summary:
        "This report covers an internal audit of the cybersecurity incident response procedures following several security breaches during Q3 2023. The focus is on identifying gaps in incident handling, response times, and system vulnerabilities.",
      evaluation_status: "Passed",
    },
    {
      id: 4,
      title: "Employee Engagement Survey Results and Analysis Q2 2023",
      summary:
        "This report presents the findings from the Q2 2023 Employee Engagement Survey, which assesses employee satisfaction, motivation, and workplace culture across the organization. The data collected includes responses from all global offices and represents 85% of the workforce.",
      evaluation_status: "Needs Review",
    },
  ];
}

export function DashBoardPage() {
  const [data, setData] = useState<Report[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div> No Data</div>; // Show loading state while data is being fetched
  }

  return (
    <div className="container mx-auto py-10">
        <Button> Add a new report</Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
