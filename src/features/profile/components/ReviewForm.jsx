import { useState, useContext, useEffect } from "react";
import Button from "../../../components/Button";
import axios from "axios";
import { ProfileContext } from "../context/ProfileContextProvider";
import useAuth from "../../../hooks/useAuth";

export default function ReviewForm({ onClose }) {
  const { profileUser, fetchReviews } = useContext(ProfileContext);
  const { authUser } = useAuth();

  const [review, setReview] = useState({
    content: "",
    senderId: authUser?.id || "",
    receiverId: profileUser?.id || "",
  });

  useEffect(() => {
    if (profileUser) {
      setReview((prevReview) => ({
        ...prevReview,
        receiverId: profileUser.id,
      }));
    }
  }, [profileUser]);

  const handleFormSubmitReview = async (event) => {
    event.preventDefault();
    console.log("Form is being submitted...");
    console.log(review);

    try {
      await axios.post("/api/reviews", review);
      fetchReviews();
      if (onClose && typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleFormSubmitReview}>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="review"
        >
          Review:{" "}
          {profileUser
            ? `${profileUser.firstName} ${profileUser.lastName}`
            : "Loading..."}
        </label>
        <textarea
          id="review"
          className="w-full h-24 p-2 border border-gray-300 rounded-lg"
          placeholder="กรอกความคิดเห็น"
          value={review.content}
          onChange={(e) => setReview({ ...review, content: e.target.value })}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <Button bg="red" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button bg="green" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
