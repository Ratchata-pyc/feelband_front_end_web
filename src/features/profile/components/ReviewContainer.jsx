import { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContextProvider";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import axios from "axios";

export default function ReviewContainer() {
  const { reviews, fetchReviews } = useContext(ProfileContext);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleEditReview = async (reviewId, updatedContent) => {
    try {
      await axios.put(`/api/reviews/${reviewId}`, { content: updatedContent });
      fetchReviews();
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="py-8 px-16 min-w-[1300px] max-w-[1300px]">
          <div className="grid grid-cols-2">
            <div className="flex justify-start items-center">
              <h2>Review</h2>
            </div>
            <div className="flex justify-end">
              <Button
                bg="stone"
                width="40"
                onClick={() => setIsReviewOpen(true)}
              >
                Write Review
              </Button>
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
                  user={`${review.senderFirstName} ${review.senderLastName}`}
                  text={review.content}
                  senderId={review.senderId}
                  reviewId={review.id}
                  onEdit={handleEditReview}
                  onDelete={handleDeleteReview}
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
