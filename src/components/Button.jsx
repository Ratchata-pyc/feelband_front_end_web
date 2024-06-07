/* eslint-disable react/prop-types */
const bgMap = {
  stone: "bg-stone-500 hover:bg-stone-600 ",
  green: "bg-green-500 hover:bg-green-600 ",
  red: "bg-red-500 hover:bg-red-600 ",
};

const colorMap = {
  white: "text-white",
  black: "text-black",
};

const widthMap = {
  full: "w-full",
  40: "w-40",
  60: "w-60",
  80: "w-80",
};

export default function Button({
  children,
  bg = "gray",
  color = "white",
  width,
  onClick,
}) {
  return (
    <button
      className={`py-2 px-4 ${bgMap[bg]} ${colorMap[color]} ${widthMap[width]} border rounded-lg`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
