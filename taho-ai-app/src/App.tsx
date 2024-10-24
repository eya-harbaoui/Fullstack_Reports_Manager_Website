import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import { DashBoardPage } from "./pages/reportsDashboard/reportsPageDashboard";
import {ReportDetails} from "./pages/ReportDetailsPage"
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoardPage />} />
        <Route path="/report/:id" element={<ReportDetails />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
