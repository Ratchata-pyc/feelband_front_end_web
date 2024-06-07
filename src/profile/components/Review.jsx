/* eslint-disable react/prop-types */
export default function Review({ user, text }) {
  return (
    <>
      <div className="border p-4 mt-4 mb-4 flex bg-white">
        <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4">
          P
        </div>
        <div>
          <p>{user}</p>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}
