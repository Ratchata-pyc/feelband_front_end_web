import Button from "../../../components/Button";
import iconLine from "../../../assets/iconLine.png";

const contact = "lipook";

export default function AddLine() {
  const handleAddLine = () => {
    // URL สำหรับการเพิ่มเพื่อนใน LINE
    const lineUrl = `https://line.me/ti/p/~${contact}`;
    window.open(lineUrl, "_blank");
  };

  return (
    <div className="py-4">
      <Button bg="green" width={60} onClick={handleAddLine}>
        <div className="flex justify-center items-center gap-4">
          <img src={iconLine} className="h-10" />
          {contact}
        </div>
      </Button>
      {/* <button
        className="bg-green-500 text-white py-2 rounded "
        style={{ width: "250px" }}
        onClick={handleAddLine}
      >
        Add Line
      </button> */}
    </div>
  );
}
