import { useState } from "react";

/* eslint-disable react/prop-types */
export default function Checkbox({ title, list }) {
  const [selected, setSelected] = useState(null);

  const handleChange = (item) => {
    if (selected === item) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  };

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      <div className="flex flex-wrap">
        {list.map((item) => (
          <div key={item} className="w-1/2">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
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
