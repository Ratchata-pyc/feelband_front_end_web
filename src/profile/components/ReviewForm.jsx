export default function ReviewForm() {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="review"
      >
        Comment .............
      </label>
      <textarea
        id="review"
        className="w-full h-24 p-2 border border-gray-300 rounded-lg"
        placeholder="กรอกความคิดเห็น"
      />
    </>
  );
}
