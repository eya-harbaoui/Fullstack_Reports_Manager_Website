import { useEffect, useState } from "react";
import { Report, columns } from "./columns";
import { DataTable } from "./data-table";
import {Button} from "@/components/ui/button";
import axios from "axios";

async function getData(): Promise<Report[]> {
  // Fetch data from your API here.
   try {
     const response = await axios.get("http://localhost:8000/reports"); 
     return response.data; 
   } catch (error) {
     console.error("Error fetching reports:", error);
     return [];
   }
}

export function DashBoardPage() {
  const [data, setData] = useState<Report[]>([]); // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    // Fetch data initially
    fetchData();

    // Set up polling to fetch data every 3 seconds 
    const interval = setInterval(fetchData, 3000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Reports DashBoard</h1>
      <Button className="mb-4">Add a new report</Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
