import { useState, useEffect, useRef } from "react";
import Checkbox from "../../../components/Checkbox";
import InputAndLabel from "../../../components/InputAndLabel";
import defaultProfile from "../../../assets/defaultProfile.png";
import Selector from "../../../components/Selector";
import Button from "../../../components/Button";
import validateEditProfile from "../../../features/authentication/validators/validate-editProfile";
import useProfile from "../hooks/useProfile";
import userApi from "../../../apis/user";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const { profileUser, fetchProfileUser } = useProfile();

  const inputRefs = useRef([]);

  useEffect(() => {
    if (profileUser) {
      setInput({
        firstName: profileUser.firstName || "",
        lastName: profileUser.lastName || "",
        contact: profileUser.contact || "",
        budget: profileUser.budget || "",
        roleId: profileUser.roleId || "",
        genreId: profileUser.genreId || "",
        description: profileUser.description || "",
      });
      setProvince(profileUser.province || null);
      setDistrict(profileUser.district || null);
      setProfileImage(profileUser.profileImage || defaultProfile);
      setIsImageUploaded(!!profileUser.profileImage);
      setInputCheckbox({
        role: profileUser.role || null,
        genre: profileUser.genre || null,
      });
    }
  }, [profileUser]);

  const handleProvinceChange = (selectedOption) => {
    setProvince(selectedOption);
    setDistrict(null);
  };

  const handleDistrictChange = (selectedOption) => {
    setDistrict(selectedOption);
  };

  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

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

    setLoading(true); // แสดงสถานะการโหลด

    // ตรวจสอบว่า budget เป็นตัวเลขหรือไม่
    if (isNaN(input.budget)) {
      setInputError((prevState) => ({
        ...prevState,
        budget: "Budget must be a number",
      }));
      setLoading(false); // ซ่อนสถานะการโหลดเมื่อมีข้อผิดพลาด
      return;
    }

    const validationErrors = validateEditProfile(
      input,
      inputCheckbox,
      province,
      district
    );

    if (validationErrors) {
      setInputError(validationErrors);
      setLoading(false); // ซ่อนสถานะการโหลดเมื่อมีข้อผิดพลาด
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
        setLoading(false); // ซ่อนสถานะการโหลดเมื่อมีข้อผิดพลาด
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

    data = Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
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
    } finally {
      setLoading(false); // ซ่อนสถานะการโหลดเมื่อทำงานเสร็จสิ้น
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      } else {
        handleFormSubmit();
      }
    }
  };

  return (
    <form
      className="bg-white rounded relative flex flex-col"
      onSubmit={handleFormSubmit}
    >
      {loading && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-lg uploading-bounce uploading-dots">
            Uploading
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 pt-4 flex-grow">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
          <div className="order-2 lg:order-1 flex flex-col gap-8">
            <div className="flex flex-wrap gap-4">
              <div className="w-full lg:w-1/2">
                <InputAndLabel
                  label="FirstName"
                  placeholder="FirstName"
                  name="firstName"
                  value={input.firstName}
                  onChange={handleChangeInput}
                  error={inputError.firstName}
                  ref={(el) => (inputRefs.current[0] = el)}
                  onKeyPress={(e) => handleKeyPress(e, 0)}
                />
              </div>
              <div className="w-full lg:w-1/2">
                <InputAndLabel
                  label="LastName"
                  placeholder="LastName"
                  name="lastName"
                  value={input.lastName}
                  onChange={handleChangeInput}
                  error={inputError.lastName}
                  ref={(el) => (inputRefs.current[1] = el)}
                  onKeyPress={(e) => handleKeyPress(e, 1)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="w-full lg:w-1/2">
                <InputAndLabel
                  label="Line Id"
                  placeholder="Line Id"
                  name="contact"
                  value={input.contact}
                  onChange={handleChangeInput}
                  error={inputError.contact}
                  ref={(el) => (inputRefs.current[2] = el)}
                  onKeyPress={(e) => handleKeyPress(e, 2)}
                />
              </div>
              <div className="w-full lg:w-1/2">
                <InputAndLabel
                  label="Budget"
                  placeholder="Budget"
                  name="budget"
                  type="number"
                  value={input.budget}
                  onChange={handleChangeInput}
                  error={inputError.budget}
                  ref={(el) => (inputRefs.current[3] = el)}
                  onKeyPress={(e) => handleKeyPress(e, 3)}
                />
              </div>
            </div>

            <div className="area">
              <Selector
                onProvinceChange={handleProvinceChange}
                onDistrictChange={handleDistrictChange}
                errorProvince={inputError.province}
                errorDistrict={inputError.district}
                selectedProvince={province}
                selectedDistrict={district}
              />
              <div className="selection-info"></div>
            </div>

            <div className="flex gap-4">
              <div className="Role">
                <div className="flex justify-between">
                  <div className="w-full">
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
                        { id: 7, label: "Trumpet" },
                        { id: 8, label: "Violin" },
                        { id: 9, label: "Cello" },
                        { id: 10, label: "Flute" },
                        { id: 11, label: "Clarinet" },
                        { id: 12, label: "Trombone" },
                        { id: 13, label: "Keyboard" },
                        { id: 14, label: "Percussion" },
                        { id: 15, label: "Harp" },
                        { id: 16, label: "Accordion" },
                        { id: 17, label: "Banjo" },
                        { id: 18, label: "Mandolin" },
                        { id: 19, label: "Ukulele" },
                        { id: 20, label: "Synthesizer" },
                      ]}
                      selected={inputCheckbox.role}
                      onChange={(value) => handleCheckboxChange("role", value)}
                    />
                  </div>
                </div>
              </div>
              <div className="Genre">
                <div className="flex justify-between">
                  <div className="w-full">
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
                        { id: 5, label: "Hip-Hop/Rap" },
                        { id: 6, label: "Classical" },
                        { id: 7, label: "Country" },
                        { id: 8, label: "Reggae" },
                        { id: 9, label: "R&B" },
                        { id: 10, label: "Soul" },
                        { id: 11, label: "Funk" },
                        { id: 12, label: "Electronic" },
                        { id: 13, label: "Dance" },
                        { id: 14, label: "Metal" },
                        { id: 15, label: "Punk" },
                        { id: 16, label: "Disco" },
                        { id: 17, label: "Folk" },
                        { id: 18, label: "Latin" },
                        { id: 19, label: "Reggaeton" },
                        { id: 20, label: "Gospel" },
                        { id: 21, label: "K-Pop" },
                        { id: 22, label: "Alternative" },
                        { id: 23, label: "Indie" },
                        { id: 24, label: "Ska" },
                      ]}
                      selected={inputCheckbox.genre}
                      onChange={(value) => handleCheckboxChange("genre", value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="-mt-3">
              <label
                className="block text-gray-700 text-sm font-bold"
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
                ref={(el) => (inputRefs.current[4] = el)}
                onKeyPress={(e) => handleKeyPress(e, 4)}
              ></textarea>
            </div>
          </div>

          <div className="order-1 lg:order-2 w-full">
            <div className="image w-full h-auto   min-w-[300px]  min-h-[400px] sm:max-w-[300px] sm:min-w-[300px] sm:min-h-[300px] sm:max-h-[300px] md:max-w-[450px] md:min-w-[450px] md:min-h-[470px] md:max-h-[470px] relative">
              <label className="block text-gray-700 text-sm font-bold mb-2 ">
                Profile Image
              </label>
              <div
                className="flex justify-center items-center w-full cursor-pointer"
                onClick={triggerFileInput}
              >
                <div className="flex justify-center items-start overflow-hidden  z-10">
                  <img
                    className="w-full max-w-md h-auto object-cover "
                    src={profileImage}
                    alt="Profile"
                  />
                </div>

                {isImageUploaded && (
                  <button
                    onClick={handleImageRemove}
                    className="absolute  right-2 bottom-2 bg-red-500 text-white p-2 rounded-full w-10 transform rotate-360 z-20"
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
          </div>
        </div>
      </div>
      <div className="mt-auto flex justify-end space-x-2 mt-4">
        <Button bg="red" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button bg="green" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
