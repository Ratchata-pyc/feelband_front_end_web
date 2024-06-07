/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const bgMap = {
  amber: "bg-amber-100",
  white: "bg-white",
};

export default function Modal({
  width = 30,
  children,
  open,
  onClose,
  onSubmit, // เพิ่ม callback function สำหรับการ submit
  bg = "white",
}) {
  useEffect(() => {
    const handlePressEsc = (e) => {
      if (e.keyCode === 27) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handlePressEsc);
    return () => document.removeEventListener("keydown", handlePressEsc);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <>
      {open &&
        createPortal(
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
            <div className="fixed inset-0 z-40" onMouseDown={onClose}>
              <div className="flex justify-center items-center min-h-screen">
                <div
                  className={`rounded-lg shadow-lg ${bgMap[bg]} overflow-auto`}
                  style={{ width: `${width}rem`, maxHeight: "90vh" }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="p-4">
                    {children}
                    <div className="flex justify-end mt-4 gap-2">
                      <Button bg="green" onClick={onSubmit}>
                        Submit
                      </Button>
                      <Button bg="red" onClick={onClose}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.getElementById("modal")
        )}
    </>
  );
}
