import { useEffect, useState } from "react";
import axios from "axios";
import ReportItem from "./ReportItem";

export default function ReportContainer() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("/api/reports");
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = (deletedReportId) => {
    setReports(reports.filter((report) => report.id !== deletedReportId));
  };

  return (
    <div className="shadow-md mx-16 bg-white h-full pb-8">
      <div className="pt-8 pl-8">
        <div>Report {reports.length} message</div>
      </div>
      <div className="flex flex-col items-center h-full overflow-scroll gap-16">
        {reports.map((report) => (
          <ReportItem key={report.id} report={report} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
