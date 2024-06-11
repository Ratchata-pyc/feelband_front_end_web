import qrCodeSrc from "../assets/qrcode.jpeg"; // เพิ่มเส้นทางไปยังภาพ QR Code ของคุณ

export default function Footer() {
  return (
    <footer className="bg-stone-500 text-white py-6 px-8 flex items-center z-10">
      <div className="flex items-center w-full">
        <div className="mr-4">
          <img src={qrCodeSrc} alt="QR Code" className="h-24 w-24" />
        </div>
        <div>
          <h3 className="text-lg font-bold">ติดต่อเรา</h3>
          <p>Facebook: Feel Band</p>
          <p>Line: feelband 555</p>
          <p>Tel: 1212312121</p>
        </div>
      </div>
    </footer>
  );
}
