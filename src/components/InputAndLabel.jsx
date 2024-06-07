/* eslint-disable react/prop-types */
export default function InputAndLabel({
  label,
  type = "text",
  error,
  value,
  id,
}) {
  return (
    <div className="flex flex-col w-full">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        className={`w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:border-stone-500 focus:ring-stone-300"
          }`}
      />
      {error && (
        <small className="text-red-500  mt-1">
          มีข้อผิดพลาดในข้อมูลที่คุณป้อน
        </small>
      )}
    </div>
  );
}
