import { useState } from "react";
import johnSrc from "../../assets/profile_1.jpg";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import EditProfileForm from "./EditProfileForm";
import AddLine from "./AddLine";

export default function ProfileInfo() {
  const [open, setOpen] = useState(false);
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
              <EditProfileForm />
            </Modal>
            <Button width="40" bg="stone">
              Report
            </Button>
            <Modal></Modal>
          </div>
        </div>

        <div className="flex justify-center items-center bg-white shadow-md mt-4 max-w-[1300px]">
          <div className="grid grid-cols-2 ">
            <div className="flex justify-end items-center">
              <div className=" flex justify-center items-start overflow-hidden">
                <img
                  className="flex w-[600px] h-[700px]"
                  src={johnSrc}
                  alt="Profile"
                />
              </div>
            </div>

            <div className="flex">
              <div className="overflow-hidden pt-4 ">
                <div className=" grid grid-cols-2 gap-4  py-4 px-8 max-w-[300px]">
                  <p>Name:</p>
                  <p>John Mayer</p>
                  <p>Role:</p>
                  <p>Guitars</p>
                  <p>Genre:</p>
                  <p>Jazz</p>
                  <p>Province:</p>
                  <p>Bangkok</p>
                  <p>District:</p>
                  <p>Ekkamai</p>
                  <p>Budget:</p>
                  <p>1,000 Bath</p>
                </div>
                <div className="py-4 px-8">
                  <AddLine />
                </div>

                <div className="border-none  py-4 px-8 mt-4 max-w-[600px]">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                    rem alias vitae. Eligendi voluptatem ipsa ipsum beatae
                    repellat assumenda, aperiam excepturi. Explicabo animi
                    architecto alias libero fuga. Numquam modi expedita facere
                    placeat dolorem harum, ipsam odit. Error, quaerat? Numquam,
                    nesciunt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
