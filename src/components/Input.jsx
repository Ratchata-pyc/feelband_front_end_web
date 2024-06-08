/* eslint-disable react/prop-types */
import { useState } from "react";
import eyeOpen from "../assets/blind/eye-open.svg";
import eyeClose from "../assets/blind/eye-close.svg";

export default function Input({
  placeholder,
  type = "text",
  error,
  value,
  onChange,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  return (
    <div className="flex flex-col w-full mb-4">
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
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
        <div className="bg-red-200">
          {error && <small className="absolute text-red-500 ">{error}</small>}
        </div>

        {type === "password" && (
          <button
            type="button"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <img
              src={showPassword ? eyeOpen : eyeClose}
              alt={showPassword ? "Hide password" : "Show password"}
              className="w-5 h-5"
            />
          </button>
        )}
      </div>
      <div className="relative h-4 mt-1"></div>
    </div>
  );
}
