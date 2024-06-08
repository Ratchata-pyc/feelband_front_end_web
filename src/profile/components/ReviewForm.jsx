/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../../components/Button";

export default function ReviewForm({ onClose }) {
  const [review, setReview] = useState({
    message: "",
    senderId: "12345",
    musicianId: "67890",
  });

  const firstName = "John";
  const lastName = "Mayer";

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form is being submitted...");
    console.log(review); // Check review before submit

    // Check if onClose is passed and is a function before calling it
    if (onClose && typeof onClose === "function") {
      onClose(); // Close modal after submit
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="review"
        >
          {`Comment ${firstName} ${lastName}`}
        </label>
        <textarea
          id="review"
          className="w-full h-24 p-2 border border-gray-300 rounded-lg"
          placeholder="กรอกความคิดเห็น"
          value={review.message}
          onChange={(e) => setReview({ ...review, message: e.target.value })}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <Button bg="green" type="submit">
            Submit
          </Button>
          <Button bg="red" type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
