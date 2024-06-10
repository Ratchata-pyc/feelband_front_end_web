import { useState } from "react";

export default function Checkbox({ title, list, error, onChange }) {
  const [selected, setSelected] = useState(null);

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของ checkbox
  const handleChange = (item) => {
    const newSelected = selected?.id === item.id ? null : item;
    setSelected(newSelected);

    const selectedObject = newSelected
      ? { id: newSelected.id, label: newSelected.label }
      : null;
    onChange(selectedObject);
  };

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold ">{title}</label>
      <div className="relative">
        {error && <small className="absolute text-red-500 ">{error}</small>}
      </div>
      <div className="flex flex-wrap mt-2">
        {list.map((item) => (
          <div key={item.id} className="w-1/2">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className={`form-checkbox h-5 w-5 text-gray-600 ${
                  error
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:border-stone-500 focus:ring-stone-300"
                }`}
                checked={selected?.id === item.id}
                onChange={() => handleChange(item)}
              />
              <span className="ml-2 text-gray-700">{item.label}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
