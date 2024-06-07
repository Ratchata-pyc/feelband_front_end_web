import { useState } from "react";
import Select from "react-select";

export default function Selector() {
  const provinces = [
    { value: "bangkok", label: "กรุงเทพมหานคร" },
    { value: "chiangmai", label: "เชียงใหม่" },
    { value: "phuket", label: "ภูเก็ต" },
    { value: "chonburi", label: "ชลบุรี" },
  ];

  const districts = {
    bangkok: [
      { value: "bangkapi", label: "บางกะปิ" },
      { value: "huaiKhwang", label: "ห้วยขวาง" },
    ],
    chiangmai: [
      { value: "mueangChiangMai", label: "เมืองเชียงใหม่" },
      { value: "hangDong", label: "หางดง" },
    ],
    phuket: [
      { value: "mueangPhuket", label: "เมืองภูเก็ต" },
      { value: "kathu", label: "กะทู้" },
    ],
    chonburi: [
      { value: "mueangChonburi", label: "เมืองชลบุรี" },
      { value: "bangLamung", label: "บางละมุง" },
    ],
  };

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleProvinceChange = (selectedOption) => {
    if (selectedProvince?.value !== selectedOption.value) {
      setSelectedProvince(selectedOption);
      setSelectedDistrict(null); // รีเซ็ตค่าอำเภอเป็นค่าว่างเมื่อเปลี่ยนจังหวัด
    }
    console.log(`Selected Province: ${selectedOption?.label}`);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    console.log(`Selected District: ${selectedOption?.label}`);
  };

  return (
    <div className="grid grid-cols-2 w-full ">
      <div className="flex w-full gap-5">
        <div>
          <div className="flex flex-col">
            <label
              htmlFor="province-select"
              className="block mb-2 text-sm font-bold text-gray-700 "
            >
              Province
            </label>
            <Select
              id="province-select"
              value={selectedProvince}
              onChange={handleProvinceChange}
              options={provinces}
              placeholder="เลือกจังหวัด"
              className="w-[200px] focus:outline-none focus:ring-2"
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <label
              htmlFor="district-select"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              District
            </label>
            <Select
              id="district-select"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              options={
                selectedProvince ? districts[selectedProvince.value] : []
              }
              placeholder="เลือกอำเภอ"
              className="w-[200px] focus:outline-none focus:ring-2"
              isDisabled={!selectedProvince}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
