/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import InputAndLabel from "../../../components/InputAndLabel";
import Selector from "../../../components/Selector";
import Checkbox from "../../../components/Checkbox";

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

  const navigate = useNavigate();

  const handleProvinceChange = (selectedOption) => {
    setProvince(selectedOption);
    setDistrict(null);
  };

  const handleDistrictChange = (selectedOption) => {
    setDistrict(selectedOption);
  };

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

  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();

    let formData = {
      ...input,
      provinceId: province ? province.id : null,
      districtId: district ? district.id : null,
      roleId: inputCheckbox.role ? inputCheckbox.role.id : null,
      genreId: inputCheckbox.genre ? inputCheckbox.genre.id : null,
    };

    formData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== null && v !== "")
    );

    const query = new URLSearchParams(formData).toString();
    navigate(`/search?${query}`);
    onClose();
  };

  return (
    <div>
      <div className="flex items-center justify-center">ค้นหานักดนตรี</div>
      <form className="bg-white rounded relative" onSubmit={handleFormSubmit}>
        <div className="container mx-auto px-4 pt-4">
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
            <div className="flex">
              <div className="Role">
                <div className="flex justify-between">
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
                      onChange={(value) => handleCheckboxChange("genre", value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button bg="green" type="submit" width="full">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
