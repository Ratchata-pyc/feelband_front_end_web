// ReviewContainer.js
import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

import ReviewForm from "./ReviewForm";
import Review from "./Review";

export default function ReviewContainer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center ">
        <div className="py-8 px-16 min-w-[1300px] max-w-[1300px]">
          <div className="grid grid-cols-2">
            <div className="flex justify-start items-center">
              <h2>รีวิวของฉัน</h2>
            </div>
            <div className="flex justify-end">
              <Button bg="stone" width="40" onClick={() => setOpen(true)}>
                Review
              </Button>
            </div>
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ReviewForm onClose={() => setOpen(false)} />
          </Modal>
          <Review user="Pasa" text="เล่นดีมาก"></Review>
          <Review user="Dog" text="ชอบสุดๆ"></Review>
        </div>
      </div>
    </>
  );
}
