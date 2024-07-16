import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import useAuth from "../../../hooks/useAuth";

export default function Review({
  user,
  text,
  senderId,
  reviewId,
  onEdit,
  onDelete,
  isAdmin,
  profileImage,
}) {
  const { authUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isAuthUserSender = authUser && authUser.id === senderId;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(reviewId, editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(text);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(reviewId);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="border p-4 mt-4 mb-4 flex bg-white min-h-[120px]">
        <div className="">
          <Link
            to={`/profile/${senderId}`}
            className="flex items-center justify-center bg-blue-500 text-white rounded-full 
              h-16 w-16 mr-4 
              xs:h-16 xs:w-16 xs:text-lg
              sm:h-18 sm:w-18 sm:text-lg
              md:h-20 md:w-20 md:text-xl
              lg:h-20 lg:w-20 lg:text-2xl"
          >
            <div className=" w-full h-full items-center justify-center flex">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="rounded-full h-full w-full object-cover"
                />
              ) : (
                user.charAt(0)
              )}
            </div>
          </Link>
        </div>
        <div className="w-full">
          <Link
            to={`/profile/${senderId}`}
            className="text-pink-400 hover:underline"
          >
            <p>{user}</p>
          </Link>
          {isEditing ? (
            <div>
              <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded-lg"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <Button bg="green" type="button" onClick={handleSave}>
                  Save
                </Button>
                <Button bg="red" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p>{text}</p>
              {(isAuthUserSender || isAdmin) && (
                <div className="flex justify-end items-end w-full space-x-2">
                  <Button
                    bg="red"
                    type="button"
                    className="w-full sm:w-32" // ปรับขนาดปุ่มให้เท่ากัน
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  {isAuthUserSender && (
                    <Button
                      bg="green"
                      type="button"
                      className="w-full sm:w-32" // ปรับขนาดปุ่มให้เท่ากัน
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="p-4">
          <p>Are you sure you want to delete this review?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              bg="red"
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button bg="green" type="button" onClick={confirmDelete}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
