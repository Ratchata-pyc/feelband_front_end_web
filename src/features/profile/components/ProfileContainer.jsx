import { useState, useContext } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import EditProfileForm from "./EditProfileForm";
import ProfileInfo from "./ProfileInfo";
import { ProfileContext } from "../context/ProfileContextProvider";
import ReportForm from "./ReportForm";
import axios from "axios";

const getAccessToken = () => {
  return localStorage.getItem("ACCESS_TOKEN");
};

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { profileUser, fetchProfileUser } = useContext(ProfileContext);
  const isAdmin = checkIfAdmin();
  const currentUserId = getUserIdFromToken();
  const isGuest = !getAccessToken();

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
      setModalContent(`โปรดระบุ: ${incompleteFields.join(", ")}`);
      setModalOpen(true);
      return false;
    }

    return true;
  };

  const toggleAvailability = async () => {
    setLoading(true);

    if (profileUser.isAvailable) {
      updateAvailabilityStatus();
    } else {
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
      fetchProfileUser();
      setModalContent(newStatus ? "คุณได้เปิดการรับงาน" : "คุณได้ปิดการรับงาน");
      setModalOpen(true); // เปิด Modal เพื่อแสดงข้อความ
    } catch (error) {
      console.error("Error updating availability status", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActiveStatus = async () => {
    try {
      const newStatus = !profileUser.isActive;
      await axios.patch(`/users/update-active-status/${profileUser.id}`, {
        isActive: newStatus,
      });
      fetchProfileUser();
      setModalContent(
        newStatus ? "User unblocked successfully" : "User blocked successfully"
      );
      setModalOpen(true); // เปิด Modal เพื่อแสดงข้อความ
    } catch (error) {
      console.error("Error updating active status", error);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-40 flex justify-center mt-[60px]">
        <div>
          <div className="flex justify-end">
            <div className="flex justify-end gap-4 mt-4">
              {isOwnProfile ? (
                <>
                  <Button
                    width="24"
                    smWidth="40"
                    bg={profileUser.isAvailable ? "green" : "red"}
                    onClick={toggleAvailability}
                    className={`transition-colors duration-300 ${
                      loading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    {loading
                      ? "Loading..."
                      : profileUser.isAvailable
                      ? "ON"
                      : "OFF"}
                  </Button>
                  <Button
                    width="24"
                    smWidth="40"
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
                !isGuest && (
                  <>
                    <Button
                      width="24"
                      smWidth="40"
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
                  width="24"
                  smWidth="40"
                  bg={profileUser.isActive ? "green" : "red"}
                  onClick={toggleActiveStatus}
                >
                  {profileUser.isActive ? "Unblock User" : "Block User"}
                </Button>
              )}
            </div>
          </div>
          <ProfileInfo />
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            bg="white"
            width={50}
          >
            <div>
              <h2 className="text-xl font-bold mb-4">ข้อความ</h2>
              <p>{modalContent}</p>
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
