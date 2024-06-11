import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import EditProfileForm from "./EditProfileForm";
import ProfileInfo from "./ProfileInfo";
import useProfile from "../hooks/useProfile";
import ReportForm from "./ReportForm";

export default function ProfileContainer() {
  const [editOpen, setEditOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const { profileUser } = useProfile();
  if (!profileUser) return <h1>404!!! User was not found</h1>;

  return (
    <div className="mx-40 flex justify-center">
      <div>
        <div className="flex justify-end">
          <div className="flex justify-end gap-4 mt-4">
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
            <Button width="40" bg="stone" onClick={() => setReportOpen(true)}>
              Report
            </Button>
            <Modal open={reportOpen} onClose={() => setReportOpen(false)}>
              <ReportForm onClose={() => setReportOpen(false)} />
            </Modal>
          </div>
        </div>
        <ProfileInfo />
      </div>
    </div>
  );
}
