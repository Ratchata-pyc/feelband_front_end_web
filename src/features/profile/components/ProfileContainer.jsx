import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import EditProfileForm from "./EditProfileForm";
import ProfileInfo from "./ProfileInfo";
import useProfile from "../hooks/useProfile";
import ReportForm from "./ReportForm";

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
  const { profileUser } = useProfile();
  const isAdmin = checkIfAdmin();
  const currentUserId = getUserIdFromToken();

  if (!profileUser) return <h1>404!!! User was not found</h1>;

  const isOwnProfile = profileUser.id === currentUserId;

  return (
    <div className="mx-40 flex justify-center">
      <div>
        <div className="flex justify-end">
          <div className="flex justify-end gap-4 mt-4">
            {isOwnProfile ? (
              <>
                <Button width="40" bg="stone">
                  ON/OFF
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
            )}
            {isAdmin && !isOwnProfile && (
              <Button width="40" bg="stone" onClick={() => alert("Ban User")}>
                Ban User
              </Button>
            )}
          </div>
        </div>
        <ProfileInfo />
      </div>
    </div>
  );
}
