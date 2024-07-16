import { useState, useContext } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import EditProfileForm from "./EditProfileForm";
import ProfileInfo from "./ProfileInfo";
import { ProfileContext } from "../context/ProfileContextProvider";
import ReportForm from "./ReportForm";
import axios from "axios";

// ฟังก์ชันสำหรับดึงค่า token จาก localStorage
const getAccessToken = () => {
  return localStorage.getItem("ACCESS_TOKEN");
};

// ฟังก์ชันสำหรับตรวจสอบว่าเป็น Admin หรือไม่
const checkIfAdmin = () => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.isAdmin || false;
  } catch (error) {
    console.error("Invalid token format", error);
    return false;
  }
};

// ฟังก์ชันสำหรับดึง id ของผู้ใช้จาก token
const getUserIdFromToken = () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id || null;
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
};

export default function ProfileContainer() {
  const [editOpen, setEditOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // state สำหรับ Modal
  const [modalMessage, setModalMessage] = useState(""); // state สำหรับข้อความใน Modal
  const { profileUser, fetchProfileUser } = useContext(ProfileContext);
  const isAdmin = checkIfAdmin();
  const currentUserId = getUserIdFromToken();
  const isGuest = !getAccessToken(); // ตรวจสอบว่าเป็น guest หรือไม่

  if (!profileUser) return <h1>404!!! User was not found</h1>;

  const isOwnProfile = profileUser.id === currentUserId;

  const checkUserInformationComplete = (user) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "role",
      "genre",
      "province",
      "district",
      "budget",
    ];
    const incompleteFields = requiredFields.filter((field) => !user[field]);

    if (incompleteFields.length > 0) {
      setModalMessage(`โปรดระบุ: ${incompleteFields.join(", ")}`);
      setModalOpen(true); // เปิด Modal เมื่อข้อมูลไม่ครบถ้วน
      return false;
    }

    return true;
  };

  const toggleAvailability = async () => {
    if (profileUser.isAvailable) {
      // ถ้ากำลังปิดการรับงานไม่ต้องตรวจสอบข้อมูล
      updateAvailabilityStatus();
    } else {
      // ตรวจสอบข้อมูลก่อนเปิดการรับงาน
      if (checkUserInformationComplete(profileUser)) {
        updateAvailabilityStatus();
      }
    }
  };

  const updateAvailabilityStatus = async () => {
    try {
      const newStatus = !profileUser.isAvailable;
      await axios.patch(`/users/update-availability/${profileUser.id}`, {
        isAvailable: newStatus,
      });
      fetchProfileUser(); // อัปเดตข้อมูลผู้ใช้หลังจากอัปเดตสถานะ
      alert(newStatus ? "คุณได้เปิดการรับงาน" : "คุณได้ปิดการรับงาน");
    } catch (error) {
      console.error("Error updating availability status", error);
    }
  };

  const toggleActiveStatus = async () => {
    try {
      const newStatus = !profileUser.isActive;
      await axios.patch(`/users/update-active-status/${profileUser.id}`, {
        isActive: newStatus,
      });
      fetchProfileUser(); // อัปเดตข้อมูลผู้ใช้หลังจากอัปเดตสถานะ
      alert(
        newStatus ? "User unblocked successfully" : "User blocked successfully"
      );
    } catch (error) {
      console.error("Error updating active status", error);
    }
  };

  return (
    <div className="w-full  bg-white">
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-40 flex justify-center mt-[60px]">
        <div>
          <div className="flex justify-end">
            <div className="flex justify-end gap-4 mt-4">
              {isOwnProfile ? (
                <>
                  <Button
                    width="24" // ปรับขนาดปุ่มในมุมมองมือถือ
                    smWidth="40" // ขนาดปุ่มในหน้าจอปกติ
                    bg={profileUser.isAvailable ? "green" : "red"}
                    onClick={toggleAvailability}
                  >
                    {profileUser.isAvailable ? "ON" : "OFF"}
                  </Button>
                  <Button
                    width="24" // ปรับขนาดปุ่มในมุมมองมือถือ
                    smWidth="40" // ขนาดปุ่มในหน้าจอปกติ
                    bg="stone"
                    onClick={() => setEditOpen(true)}
                  >
                    Edit Profile
                  </Button>
                  <Modal
                    width={70}
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                  >
                    <EditProfileForm onClose={() => setEditOpen(false)} />
                  </Modal>
                </>
              ) : (
                !isAdmin &&
                !isGuest && ( // แสดงปุ่ม Report เฉพาะถ้าผู้ใช้งานไม่ใช่ admin และไม่ใช่ guest
                  <>
                    <Button
                      width="24" // ปรับขนาดปุ่มในมุมมองมือถือ
                      smWidth="40" // ขนาดปุ่มในหน้าจอปกติ
                      bg="stone"
                      onClick={() => setReportOpen(true)}
                    >
                      Report
                    </Button>
                    <Modal
                      open={reportOpen}
                      onClose={() => setReportOpen(false)}
                    >
                      <ReportForm onClose={() => setReportOpen(false)} />
                    </Modal>
                  </>
                )
              )}
              {isAdmin && !isOwnProfile && (
                <Button
                  width="24" // ปรับขนาดปุ่มในมุมมองมือถือ
                  smWidth="40" // ขนาดปุ่มในหน้าจอปกติ
                  bg={profileUser.isActive ? "green" : "red"}
                  onClick={toggleActiveStatus}
                >
                  {profileUser.isActive ? "Unblock User" : "Block User"}
                </Button>
              )}
            </div>
          </div>
          <ProfileInfo />
          {/* Modal สำหรับแสดงข้อความ */}
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            bg="white"
            width={50}
          >
            <div>
              <h2 className="text-xl font-bold mb-4">
                กรุณากรอกข้อมูลให้ครบถ้วน
              </h2>
              <p>{modalMessage}</p>
              <div className="flex justify-end mt-4">
                <Button bg="stone" onClick={() => setModalOpen(false)}>
                  ปิด
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
