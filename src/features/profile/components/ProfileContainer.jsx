import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import EditProfileForm from "./EditProfileForm";
import ProfileInfo from "./ProfileInfo";
import useProfile from "../hooks/useProfile";

export default function ProfileContainer() {
  const [open, setOpen] = useState(false);
  const { profileUser } = useProfile();
  if (!profileUser) return <h1>404!!! User was not found</h1>;

  return (
    <div className=" mx-40  flex justify-center ">
      <div className="">
        <div className="flex justify-end ">
          <div className="flex justify-end gap-4 mt-4 ">
            <Button width="40" bg="stone">
              ON/OFF
            </Button>
            <Button width="40" bg="stone" onClick={() => setOpen(true)}>
              Edit Profile
            </Button>
            <Modal width={70} open={open} onClose={() => setOpen(false)}>
              <EditProfileForm onClose={() => setOpen(false)} />
            </Modal>
            <Button width="40" bg="stone">
              Report
            </Button>
          </div>
        </div>

        <ProfileInfo />
      </div>
    </div>
  );
}
