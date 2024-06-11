/* eslint-disable no-undef */
// import { useState } from "react";
// import Button from "../../../components/Button";

// export default function ReportForm({ onClose }) {
//   const [report, setReview] = useState({
//     message: "",
//     senderId: "12345",
//     musicianId: "67890",
//   });

//   const firstName = "John";
//   const lastName = "Mayer";

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     console.log("Form is being submitted...");
//     console.log(report); // Check review before submit

//     // Check if onClose is passed and is a function before calling it
//     if (onClose && typeof onClose === "function") {
//       onClose(); // Close modal after submit
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <label
//           className="block text-gray-700 text-sm font-bold mb-2"
//           htmlFor="review"
//         >
//           {`report ${firstName} ${lastName}`}
//         </label>
//         <textarea
//           id="review"
//           className="w-full h-24 p-2 border border-gray-300 rounded-lg"
//           placeholder="ร้องเรียน..."
//           value={report.message}
//           onChange={(e) => setReview({ ...report, message: e.target.value })}
//         />
//         <div className="flex justify-end space-x-2 mt-4">
//           <Button bg="red" type="button" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button bg="green" type="submit">
//             Submit
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
import { useState, useContext } from "react";
import Button from "../../../components/Button";
import userApi from "../../../apis/user"; // ตรวจสอบว่า api.js อยู่ในตำแหน่งที่ถูกต้อง
import { AuthContext } from "../../../contexts/AuthContext"; // นำเข้า AuthContext
import { getAccessToken } from "../../../utils/local-storage"; // เพิ่มการ import

export default function ReportForm({ onClose }) {
  const { authUser } = useContext(AuthContext); // ดึง authUser จาก context
  const [report, setReport] = useState({
    receiverId: 2,
    complaint: "",
  });

  const firstName = authUser ? authUser.firstName : "John"; // ชื่อจริงของผู้ใช้ (สามารถรับจาก context)
  const lastName = authUser ? authUser.lastName : "Mayer"; // นามสกุลของผู้ใช้ (สามารถรับจาก context)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form is being submitted...");
    console.log(report); // ตรวจสอบข้อมูลก่อนส่ง

    try {
      const response = await userApi.report(
        {
          receiverId: report.receiverId,
          complaint: report.complaint,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`, // ใช้ token จาก local storage
          },
        }
      );
      console.log("Report created:", response.data);
    } catch (error) {
      console.error("Failed to create report:", error);
    }

    if (onClose && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="review"
        >
          {`Report ${firstName} ${lastName}`}
        </label>
        <textarea
          id="review"
          className="w-full h-24 p-2 border border-gray-300 rounded-lg"
          placeholder="ร้องเรียน..."
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
