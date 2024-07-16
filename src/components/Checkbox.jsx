import { useState, useEffect } from "react";

export default function Dropdown({ title, list, error, onChange, selected }) {
  const [localSelected, setLocalSelected] = useState(selected);

  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของ dropdown
  const handleChange = (event) => {
    const selectedItem = list.find(
      (item) => item.id === parseInt(event.target.value, 10)
    );
    setLocalSelected(selectedItem);
    onChange(selectedItem);
  };

  return (
    <div className=" w-[150px] xxs:w-[165px] xs:w-[200px]  md:w-[205px]">
      <label
        htmlFor="dropdown-select"
        className="mb-2 text-sm font-bold text-gray-700"
      >
        {title}
      </label>
      <select
        id="dropdown-select"
        value={localSelected ? localSelected.id : ""}
        onChange={handleChange}
        className="w-full focus:outline-none focus:ring-2 border border-gray-300 rounded-md px-2 py-2"
      >
        <option value="" disabled>
          {title}
        </option>
        {list.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>

      {error && (
        <div className="bg-red-200">
          <small className="absolute text-red-500">{error}</small>
        </div>
      )}
    </div>
  );
}
