import "./index.css";
import { ReportPage } from "./pages/ReportPage";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

TimeAgo.addDefaultLocale(en);

const queryClient = new QueryClient();

const ReportsView = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="alts/show/:corporationID/" element={<ReportPage />} />
          <Route path="alts/show/" element={<Navigate to={"/alts/show/0/"} />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

const appDiv = document.getElementById("root");
render(<ReportsView />, appDiv);
