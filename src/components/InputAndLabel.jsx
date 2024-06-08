/* eslint-disable react/prop-types */
import { useState } from "react";
export default function InputAndLabel({
  placeholder,
  type = "text",
  error,
  value,
  onChange,
  name,
  label,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="relative">
        <input
          placeholder={placeholder}
          className={`w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2
            ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:border-stone-500 focus:ring-stone-300"
            }`}
          value={value}
          onChange={onChange}
          name={name}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          ></button>
        )}
      </div>
      {error && <small className="text-red-500 mt-1">{error}</small>}
    </div>
  );
}
