import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import { DashBoardPage } from "./pages/reportsDashboard/reportsPageDashboard";
import { ReportDetails } from "./pages/ReportDetailsPage";
import { ReportForm } from "./pages/newReportPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Reports" element={<DashBoardPage />} />
        <Route path="/Reports/:id" element={<ReportDetails />} />
        <Route path="/Reports/new" element={<ReportForm />} />
      </Routes>
    </Router>
  );
};

export default App;
