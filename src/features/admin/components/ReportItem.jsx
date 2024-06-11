export default function ReportItem() {
  return (
    <div className="relative flex flex-col border border-gray-950 justify-center items-center min-h-80 max-h-80 max-w-[720px] min-w-[720px] p-12 pb-4">
      <div>
        <div className="-mt-8 top-0">
          <p>Report 1</p>
        </div>
        <div className="absolute -top-1 right-1">
          <p>x</p>
        </div>
      </div>

      <div className="flex items-center justify-around w-full -mt-4">
        <div className="flex flex-col items-center justify-center  ">
          <p>sender</p>
          <p className="h-32 w-24 bg-yellow-300 ">img</p>
          <p>name</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p>receiver</p>
          <p className="h-32 w-24 bg-yellow-300 ">img</p>
          <p>name</p>
        </div>
      </div>
      <div className=" overflow-hidden border border-gray-950 p-2 h-[120px]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero,
        sapiente distinctio, porro ab commodi error rem voluptatum repudiandae
        magnam, modi inventore ut consequatur soluta deserunt quos tenetur earum
        consequuntur sequi.
      </div>
    </div>
  );
}
