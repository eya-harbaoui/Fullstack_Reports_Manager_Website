import { useEffect, useState } from "react";
import { Report, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button"; // Ajustez cette importation si nécessaire
import { useNavigate } from "react-router-dom";
import axios from "axios";

async function getData(): Promise<Report[]> {
  try {
    const response = await axios.get("http://localhost:8000/reports");
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
}

export function DashBoardPage() {
  const [data, setData] = useState<Report[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData(); // Appeler une seule fois lors du premier chargement

    // Vous pouvez éventuellement laisser cette ligne pour des mises à jour périodiques, mais ce n'est pas nécessaire
    // const interval = setInterval(fetchData, 3000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Reports DashBoard</h1>
      <Button className="mb-4" onClick={() => navigate("/Reports/new")}>
        Add a new report
      </Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
