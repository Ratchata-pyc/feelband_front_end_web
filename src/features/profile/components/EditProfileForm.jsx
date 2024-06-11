/* eslint-disable no-unused-vars */
import { useState } from "react";
import Checkbox from "../../../components/Checkbox";
import InputAndLabel from "../../../components/InputAndLabel";
import defaultProfile from "../../../assets/defaultProfile.png";
import Selector from "../../../components/Selector";
import Button from "../../../components/Button";
import validateEditProfile from "../../../features/authentication/validators/validate-editProfile";
import useProfile from "../hooks/useProfile";
import userApi from "../../../apis/user";
import axios from "axios"; // เพิ่ม axios สำหรับการอัพโหลดภาพ
import { toast } from "react-toastify";

const initialInput = {
  firstName: "",
  lastName: "",
  contact: "",
  budget: "",
  roleId: "",
  genreId: "",
  description: "",
};

const initialInputError = {
  firstName: "",
  lastName: "",
  contact: "",
  budget: "",
  roleId: "",
  genreId: "",
  description: "",
};

export default function EditProfileForm({ onClose }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const { profileUser, fetchProfileUser } = useProfile();

  const handleProvinceChange = (selectedOption) => {
    setProvince(selectedOption);
    setDistrict(null);
  };

  const handleDistrictChange = (selectedOption) => {
    setDistrict(selectedOption);
  };

  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null); // เพิ่ม state สำหรับไฟล์ภาพที่เลือก

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [inputCheckbox, setInputCheckbox] = useState({
    role: null,
    genre: null,
  });

  const handleCheckboxChange = (name, value) => {
    setInputCheckbox((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setIsImageUploaded(true);
      };
      reader.readAsDataURL(file);
      e.target.value = null;
    }
  };

  const handleImageRemove = (e) => {
    e.stopPropagation();
    setProfileImage(defaultProfile);
    setIsImageUploaded(false);
    setSelectedImageFile(null);
    document.getElementById("fileInput").value = null;
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();

    const validationErrors = validateEditProfile(
      input,
      inputCheckbox,
      province,
      district
    );

    if (validationErrors) {
      setInputError(validationErrors);
      return;
    }

    let profileImagePath = null;

    if (selectedImageFile) {
      const formData = new FormData();
      formData.append("profileImage", selectedImageFile);
      try {
        const response = await axios.post(
          "/api/upload-profile-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        profileImagePath = response.data.filePath;
      } catch (error) {
        console.error("Error uploading the file", error);
        toast.error("Failed to upload profile image.");
        return;
      }
    }

    let data = {
      ...input,
      provinceId: province ? province.id : null,
      districtId: district ? district.id : null,
      profileImage: profileImagePath,
      roleId: inputCheckbox.role ? inputCheckbox.role.id : null,
      genreId: inputCheckbox.genre ? inputCheckbox.genre.id : null,
      id: profileUser.id,
    };
    if (data.budget) {
      data.budget = new Intl.NumberFormat().format(data.budget);
    }

    data = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== null && v !== "")
    );

    try {
      await userApi.editProfile(data);
      toast.success("Profile updated successfully!");
      fetchProfileUser();

      if (onClose && typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <form className="bg-white rounded relative" onSubmit={handleFormSubmit}>
      <div className="container mx-auto px-4 pt-4">
        <div className="grid grid-cols-2">
          <div>
            <div className="flex flex-col gap-8">
              <div className="name flex gap-4">
                <div>
                  <InputAndLabel
                    label="FirstName"
                    placeholder="FirstName"
                    name="firstName"
                    value={input.firstName}
                    onChange={handleChangeInput}
                    error={inputError.firstName}
                  />
                </div>
                <div>
                  <InputAndLabel
                    label="LastName"
                    placeholder="LastName"
                    name="lastName"
                    value={input.lastName}
                    onChange={handleChangeInput}
                    error={inputError.lastName}
                  />
                </div>
              </div>
              <div className="name flex gap-4">
                <div>
                  <InputAndLabel
                    label="Line Id"
                    placeholder="Line Id"
                    name="contact"
                    value={input.contact}
                    onChange={handleChangeInput}
                    error={inputError.contact}
                  />
                </div>
                <div>
                  <InputAndLabel
                    label="Budget"
                    placeholder="Budget"
                    name="budget"
                    value={input.budget}
                    onChange={handleChangeInput}
                    error={inputError.budget}
                  />
                </div>
              </div>

              <div className="area">
                <Selector
                  onProvinceChange={handleProvinceChange}
                  onDistrictChange={handleDistrictChange}
                  errorProvince={inputError.province}
                  errorDistrict={inputError.district}
                />
                <div className="selection-info"></div>
              </div>

              <div className="Role">
                <div className=" flex justify-between">
                  <div className="w-1/2 mr-2">
                    <Checkbox
                      title="Role"
                      name="role"
                      value={inputCheckbox.role}
                      error={inputError.roleId}
                      list={[
                        { id: 1, label: "Guitar" },
                        { id: 2, label: "Bass" },
                        { id: 3, label: "Piano" },
                        { id: 4, label: "Voice" },
                        { id: 5, label: "Drum" },
                        { id: 6, label: "Saxophone" },
                      ]}
                      onChange={(value) => handleCheckboxChange("role", value)}
                    />
                  </div>
                </div>
              </div>
              <div className="Genre">
                <div className="flex justify-between">
                  <div className="w-1/2 mr-2">
                    <Checkbox
                      title="Genre"
                      name="genre"
                      value={inputCheckbox.genre}
                      error={inputError.genreId}
                      list={[
                        { id: 1, label: "Pop" },
                        { id: 2, label: "Rock" },
                        { id: 3, label: "Jazz" },
                        { id: 4, label: "Blues" },
                      ]}
                      onChange={(value) => handleCheckboxChange("genre", value)}
                    />
                  </div>
                </div>
              </div>
              <div className="-mt-3">
                <label
                  className="block text-gray-700 text-sm font-bold "
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 h-20 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={input.description}
                  onChange={handleChangeInput}
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
                <div className="flex justify-center items-start overflow-hidden  border-gray-400 relative z-10">
                  <img
                    className="flex max-w-[600px] min-w-[600px] max-h-[625px] min-h-[625px] object-cover p-2"
                    src={profileImage}
                    alt="Profile"
                  />
                </div>

                {isImageUploaded && (
                  <button
                    onClick={handleImageRemove}
                    className="absolute bottom-3 right-1 bg-red-500 text-white p-2 rounded-full w-10 transform rotate-360 z-20"
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
            <div className="flex justify-end space-x-2 mt-4">
              <Button bg="red" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button bg="green" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
