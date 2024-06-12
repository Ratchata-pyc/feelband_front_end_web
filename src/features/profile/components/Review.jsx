// import { useState } from "react";
// import Button from "../../../components/Button";
// import Modal from "../../../components/Modal";
// import useAuth from "../../../hooks/useAuth";

// export default function Review({
//   user,
//   text,
//   senderId,
//   reviewId,
//   onEdit,
//   onDelete,
// }) {
//   const { authUser } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState(text);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   const isAuthUserSender = authUser && authUser.id === senderId;

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     onEdit(reviewId, editedText);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedText(text);
//   };

//   const handleDelete = () => {
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = () => {
//     onDelete(reviewId);
//     setIsDeleteModalOpen(false);
//   };

//   return (
//     <>
//       <div className="border p-4 mt-4 mb-4 flex bg-white min-h-[120px]">
//         <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4">
//           {user.charAt(0)}
//         </div>
//         <div className="w-full">
//           <p>{user}</p>
//           {isEditing ? (
//             <div>
//               <textarea
//                 className="w-full h-24 p-2 border border-gray-300 rounded-lg"
//                 value={editedText}
//                 onChange={(e) => setEditedText(e.target.value)}
//               />
//               <div className="flex justify-end space-x-2 mt-4">
//                 <Button bg="green" type="button" onClick={handleSave}>
//                   Save
//                 </Button>
//                 <Button bg="red" type="button" onClick={handleCancel}>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <p>{text}</p>
//               {isAuthUserSender && (
//                 <div className="flex justify-end items-end w-full">
//                   <Button
//                     bg="red"
//                     type="button"
//                     width="40"
//                     onClick={handleDelete}
//                   >
//                     Delete
//                   </Button>
//                   <Button
//                     bg="green"
//                     type="button"
//                     width="40"
//                     onClick={handleEdit}
//                   >
//                     Edit
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//       <Modal
//         open={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//       >
//         <div className="p-4">
//           <p>Are you sure you want to delete this review?</p>
//           <div className="flex justify-end space-x-2 mt-4">
//             <Button
//               bg="red"
//               type="button"
//               onClick={() => setIsDeleteModalOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button bg="green" type="button" onClick={confirmDelete}>
//               Confirm
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }

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
        <Link
          to={`/profile/${senderId}`}
          className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4"
        >
          {user.charAt(0)}
        </Link>
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
              {isAuthUserSender && (
                <div className="flex justify-end items-end w-full">
                  <Button
                    bg="red"
                    type="button"
                    width="40"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    bg="green"
                    type="button"
                    width="40"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
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
