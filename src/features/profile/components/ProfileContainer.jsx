import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import EditProfileForm from "./EditProfileForm";
import ProfileInfo from "./ProfileInfo";
import useProfile from "../hooks/useProfile";
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
  const { profileUser, fetchProfileUser } = useProfile();
  const isAdmin = checkIfAdmin();
  const currentUserId = getUserIdFromToken();

  if (!profileUser) return <h1>404!!! User was not found</h1>;

  const isOwnProfile = profileUser.id === currentUserId;

  const toggleAvailability = async () => {
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
    <div className="mx-40 flex justify-center">
      <div>
        <div className="flex justify-end">
          <div className="flex justify-end gap-4 mt-4">
            {isOwnProfile ? (
              <>
                <Button
                  width="40"
                  bg={profileUser.isAvailable ? "green" : "red"}
                  onClick={toggleAvailability}
                >
                  {profileUser.isAvailable ? "ON" : "OFF"}
                </Button>
                <Button width="40" bg="stone" onClick={() => setEditOpen(true)}>
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
              !isAdmin && ( // แสดงปุ่ม Report เฉพาะถ้าผู้ใช้งานไม่ใช่ admin
                <>
                  <Button
                    width="40"
                    bg="stone"
                    onClick={() => setReportOpen(true)}
                  >
                    Report
                  </Button>
                  <Modal open={reportOpen} onClose={() => setReportOpen(false)}>
                    <ReportForm onClose={() => setReportOpen(false)} />
                  </Modal>
                </>
              )
            )}
            {isAdmin && !isOwnProfile && (
              <Button
                width="40"
                bg={profileUser.isActive ? "green" : "red"}
                onClick={toggleActiveStatus}
              >
                {profileUser.isActive ? "Unblock User" : "Block User"}
              </Button>
            )}
          </div>
        </div>
        <ProfileInfo />
      </div>
    </div>
  );
}
