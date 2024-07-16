import { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContextProvider";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import axios from "axios";
import useProfile from "../hooks/useProfile";

// ฟังก์ชันสำหรับตรวจสอบว่าเป็น Admin หรือไม่
const checkIfAdmin = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.isAdmin || false;
  } catch (error) {
    console.error("Invalid token format", error);
    return false;
  }
};

// ฟังก์ชันสำหรับดึง id ของผู้ใช้จาก token
const getUserIdFromToken = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id || null;
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
};

export default function ReviewContainer() {
  const { reviews, fetchReviews } = useContext(ProfileContext);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { profileUser } = useProfile();
  const currentUserId = getUserIdFromToken();

  const handleEditReview = async (reviewId, updatedContent) => {
    try {
      await axios.put(`/api/reviews/${reviewId}`, { content: updatedContent });
      fetchReviews();
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleDeleteReview = async (reviewId, senderId) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`, {
        data: { senderId },
      });
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const isAdmin = checkIfAdmin();
  const isGuest = !localStorage.getItem("ACCESS_TOKEN"); // ตรวจสอบว่าเป็น guest หรือไม่

  if (!profileUser) {
    // console.log("Profile user not found"); // Log when profileUser is not found
    return <div className="min-h-[630px]"></div>;
  }

  const isOwnProfile = profileUser.id === currentUserId;

  return (
    <>
      <div className="flex justify-center">
        <div className="py-8 px-4 sm:px-8 md:px-16 min-w-[90vw] max-w-[1300px]">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="flex justify-start items-center">
              <h2>Review</h2>
            </div>
            <div className="flex justify-end">
              {!isOwnProfile && !isGuest && (
                <Button
                  bg="stone"
                  width="40"
                  onClick={() => setIsReviewOpen(true)}
                >
                  Write Review
                </Button>
              )}
            </div>
          </div>
          <Modal open={isReviewOpen} onClose={() => setIsReviewOpen(false)}>
            <ReviewForm onClose={() => setIsReviewOpen(false)} />
          </Modal>
          <div>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <Review
                  key={review.id}
                  profileImage={review.profileImage}
                  user={`${review.senderFirstName} ${review.senderLastName}`}
                  text={review.content}
                  senderId={review.senderId}
                  reviewId={review.id}
                  onEdit={handleEditReview}
                  onDelete={(reviewId) =>
                    handleDeleteReview(reviewId, review.senderId)
                  }
                  isAdmin={isAdmin} // ส่งค่า isAdmin ไปยัง Review component
                />
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
