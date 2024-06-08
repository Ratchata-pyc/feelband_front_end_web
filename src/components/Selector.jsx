import { useState } from "react";

/* eslint-disable react/prop-types */
export default function Selector({
  onProvinceChange,
  onDistrictChange,
  errorProvince,
  errorDistrict,
}) {
  const provinces = [
    { id: 1, label: "กรุงเทพมหานคร" },
    { id: 2, label: "เชียงใหม่" },
    { id: 3, label: "ภูเก็ต" },
    { id: 4, label: "ชลบุรี" },
  ];

  const districts = {
    1: [
      { id: 1, label: "บางกะปิ" },
      { id: 2, label: "ห้วยขวาง" },
    ],
    2: [
      { id: 3, label: "เมืองเชียงใหม่" },
      { id: 4, label: "หางดง" },
    ],
    3: [
      { id: 5, label: "เมืองภูเก็ต" },
      { id: 6, label: "กะทู้" },
    ],
    4: [
      { id: 7, label: "เมืองชลบุรี" },
      { id: 8, label: "บางละมุง" },
    ],
  };

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleProvinceChange = (event) => {
    const selectedOption = provinces.find(
      (province) => province.id === parseInt(event.target.value)
    );
    if (selectedProvince?.id !== selectedOption.id) {
      setSelectedProvince(selectedOption);
      setSelectedDistrict(null); // รีเซ็ตค่าอำเภอเป็นค่าว่างเมื่อเปลี่ยนจังหวัด
    }
    console.log(`Selected Province: ${selectedOption?.label}`);
    onProvinceChange(selectedOption); // เรียกฟังก์ชัน callback เมื่อค่าจังหวัดเปลี่ยนแปลง
  };

  const handleDistrictChange = (event) => {
    const selectedOption = districts[selectedProvince.id].find(
      (district) => district.id === parseInt(event.target.value)
    );
    setSelectedDistrict(selectedOption);
    console.log(`Selected District: ${selectedOption?.label}`);
    onDistrictChange(selectedOption); // เรียกฟังก์ชัน callback เมื่อค่าอำเภอเปลี่ยนแปลง
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-[205px]">
        <label
          htmlFor="province-select"
          className=" mb-2 text-sm font-bold text-gray-700"
        >
          Province
        </label>
        <select
          id="province-select"
          value={selectedProvince?.id || ""}
          onChange={handleProvinceChange}
          className="w-full focus:outline-none focus:ring-2 border border-gray-300  rounded-md px-2 py-2"
        >
          <option value="" disabled>
            เลือกจังหวัด
          </option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.label}
            </option>
          ))}
        </select>
        {errorProvince && (
          <small className="text-red-500 mt-1">{errorProvince}</small>
        )}
      </div>

      <div className="w-[205px]">
        <label
          htmlFor="district-select"
          className=" mb-2 text-sm font-bold text-gray-700"
        >
          District
        </label>
        <select
          id="district-select"
          value={selectedDistrict?.id || ""}
          onChange={handleDistrictChange}
          className="w-full focus:outline-none focus:ring-2 border border-gray-300  rounded-md px-2 py-2"
          disabled={!selectedProvince}
        >
          <option value="" disabled>
            เลือกอำเภอ
          </option>
          {selectedProvince &&
            districts[selectedProvince.id].map((district) => (
              <option key={district.id} value={district.id}>
                {district.label}
              </option>
            ))}
        </select>
        {errorDistrict && (
          <small className="text-red-500 mt-1">{errorDistrict}</small>
        )}
      </div>
    </div>
  );
}
