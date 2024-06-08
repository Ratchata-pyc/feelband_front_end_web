import { useState } from "react";

/* eslint-disable react/prop-types */
export default function Checkbox({ title, list, error, onChange }) {
  const [selected, setSelected] = useState(null);

  const handleChange = (item) => {
    const newSelected = selected === item ? null : item;
    setSelected(newSelected);
    onChange(newSelected); // ส่งค่าไปยัง parent component

    // หากไม่มีการเลือกและมี error ให้ update state ใน parent component
    if (!newSelected && error) {
      onChange(null); // Update the parent state to show the error message
    }
  };

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold ">{title}</label>
      <div className="bg-red-200">
        {error && <small className="absolute text-red-500 ">{error}</small>}
      </div>
      <div className=" flex flex-wrap mt-2">
        {list.map((item) => (
          <div key={item} className="w-1/2">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className={`form-checkbox h-5 w-5 text-gray-600 ${
                  error
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:border-stone-500 focus:ring-stone-300"
                }`}
                checked={selected === item}
                onChange={() => handleChange(item)}
              />
              <span className="ml-2 text-gray-700">{item}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
