import { useState, useContext, useEffect } from "react";
import Button from "../../../components/Button";
import axios from "axios";
import { ProfileContext } from "../context/ProfileContextProvider";
import useAuth from "../../../hooks/useAuth";

export default function ReportForm({ onClose }) {
  const { profileUser, fetchReports } = useContext(ProfileContext);
  const { authUser } = useAuth();

  const [report, setReport] = useState({
    complaint: "",
    senderId: authUser?.id || "",
    receiverId: profileUser?.id || "",
  });

  useEffect(() => {
    if (profileUser) {
      setReport((prevReport) => ({
        ...prevReport,
        receiverId: profileUser.id,
      }));
    }
  }, [profileUser]);

  const handleFormSubmitReport = async (event) => {
    event.preventDefault();
    console.log("Form is being submitted...");
    console.log(report); // Check report before submit

    try {
      await axios.post("/api/reports", report);
      fetchReports(); // Fetch reports after submission
      if (onClose && typeof onClose === "function") {
        onClose(); // Close modal after submit
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmitReport}>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="report"
        >
          report:{" "}
          {profileUser
            ? `${profileUser.firstName} ${profileUser.lastName}`
            : "Loading..."}
        </label>
        <textarea
          id="report"
          className="w-full h-24 p-2 border border-gray-300 rounded-lg"
          placeholder="กรอกคำร้องเรียน"
          value={report.complaint}
          onChange={(e) => setReport({ ...report, complaint: e.target.value })}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <Button bg="red" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button bg="green" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
