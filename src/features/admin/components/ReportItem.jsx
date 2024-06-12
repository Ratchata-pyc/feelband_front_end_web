import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import axios from "axios";
import defaultProfileImage from "../../../assets/defaultProfile.png";

export default function ReportItem({ report, onDelete }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/reports/${report.id}`);
      setIsDeleteModalOpen(false);
      onDelete(report.id); // เรียกใช้งานฟังก์ชัน onDelete
    } catch (error) {
      console.error("Failed to delete report:", error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isDeleteModalOpen && e.key === "Enter") {
        confirmDelete();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isDeleteModalOpen]);

  return (
    <div className="relative flex flex-col border justify-center items-center min-h-80 max-h-80 max-w-[720px] min-w-[720px] p-12 pb-4 bg-stone-400">
      <div>
        <div className="-mt-8 top-0">
          <p>Report {report.id}</p>
        </div>
        <div
          className="absolute -top-1 right-1 cursor-pointer"
          onClick={handleDelete}
        >
          <p>x</p>
        </div>
      </div>
      <div className="flex items-center justify-around w-full -mt-4">
        <Link
          to={`/profile/${report.senderReport.id}`}
          className="flex flex-col items-center justify-center"
        >
          <p>Sender</p>
          <img
            src={report.senderReport.profileImage || defaultProfileImage}
            alt="Sender Profile"
            className="h-32 w-24 bg-yellow-300"
          />
          <p>
            {report.senderReport.firstName} {report.senderReport.lastName}
          </p>
        </Link>
        <Link
          to={`/profile/${report.receiverReport.id}`}
          className="flex flex-col items-center justify-center"
        >
          <p>Receiver</p>
          <img
            src={report.receiverReport.profileImage || defaultProfileImage}
            alt="Receiver Profile"
            className="h-32 w-24 bg-yellow-300"
          />
          <p>
            {report.receiverReport.firstName} {report.receiverReport.lastName}
          </p>
        </Link>
      </div>
      <div className="overflow-hidden border p-2 h-[120px] w-full bg-stone-200 mt-2">
        {report.complaint}
      </div>

      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="p-4">
          <p>Are you sure you want to delete this report?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button bg="red" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button bg="green" onClick={confirmDelete}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
