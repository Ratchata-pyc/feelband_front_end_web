import { useState } from "react";
import Checkbox from "../../components/Checkbox";
import InputAndLabel from "../../components/InputAndLabel";
import defaultProfile from "../../../src/assets/defaultProfile.png";
import Selector from "./Selector";
import logo from "../../assets/logo.png";

export default function EditProfileForm() {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setIsImageUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (e) => {
    e.stopPropagation(); // ป้องกันการเรียก triggerFileInput
    setProfileImage(defaultProfile);
    setIsImageUploaded(false);
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <form className="bg-white rounded mb-4 relative">
          <div className="grid grid-cols-2">
            <div>
              <div className="flex flex-col gap-8">
                <div className="name flex gap-4">
                  <div>
                    <InputAndLabel label="Firstname" id="firstName" />
                  </div>
                  <div>
                    <InputAndLabel label="LastName" id="lastName" />
                  </div>
                </div>
                <div className="name flex gap-4">
                  <div>
                    <InputAndLabel label="Line ID" id="contact" />
                  </div>
                  <div>
                    <InputAndLabel label="Budget" id="budget" />
                  </div>
                </div>
                <div className="area">
                  <Selector />
                </div>

                <div className="Role">
                  <div className="mb-4 flex justify-between">
                    <div className="w-1/2 mr-2">
                      <Checkbox
                        title="Role"
                        list={[
                          "Guitar",
                          "Bass",
                          "Piano",
                          "Voice",
                          "Drum",
                          "Saxophone",
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="Genre">
                  <div className="mb-4 flex justify-between">
                    <div className="w-1/2 mr-2">
                      <Checkbox
                        title="Genre"
                        list={["Pop", "Rock", "Jazz", "Blues"]}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 h-40 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="image w-full ml-2 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Image
                </label>
                <div
                  className="flex justify-center items-center w-full cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <div className="flex justify-center items-start overflow-hidden border border-dashed border-gray-400 relative z-10">
                    <img
                      className="flex w-[600px] h-[600px] object-cover p-2"
                      src={profileImage}
                      alt="Profile"
                    />
                  </div>

                  {isImageUploaded && (
                    <button
                      onClick={handleImageRemove}
                      className="absolute top-4 -right-2 bg-red-500 text-white p-2 rounded-full w-10 transform rotate-360 z-20"
                      style={{ borderRadius: "50%" }}
                    >
                      X
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="absolute -bottom-24 right-8">
                <div className="flex">
                  <img src={logo} width="400" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
