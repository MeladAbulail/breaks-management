import React, { useEffect, useState } from "react";

const Dialog = ({
  isOpen,
  onClose,
  onConfirm,
  dialogContent,
  dialogTitle,
  withoutSubmitButton,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  function onConfirmClicked() {
    setShowModal(false);
    onConfirm?.();
    onClose?.();
  }

  function handleDialogClose() {
    setShowModal(false);
    onClose?.();
  }

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <>
      <div
        className={`${
          showModal
            ? "z-[1000] fixed inset-0 bg-gray-500/75 transition-opacity"
            : ""
        }`}
      >
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto min-w-xl max-w-4xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-2xl font=semibold">{dialogTitle}</h3>
                    <button
                      className="bg-transparent border-0 text-[#202020] float-right"
                      onClick={() => {
                        handleDialogClose();
                      }}
                    >
                      <span className="text-red-700 flex justify-center align-middle h-6 w-6 text-2xl  py-0 rounded-full cursor-pointer">
                        x
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">{dialogContent}</div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-[#202020] background-transparent font-bold 
                      px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 border-1 border-[#202020] rounded hover:shadow-lg cursor-pointer "
                      type="button"
                      onClick={() => {
                        handleDialogClose();
                      }}
                    >
                      Close
                    </button>
                    {!withoutSubmitButton && (
                      <button
                        className="text-white bg-[#f98232] font-bold  text-sm px-4 py-2 rounded-sm
                      shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 cursor-pointer"
                        type="button"
                        onClick={(e) => {
                          onConfirmClicked();
                        }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Dialog;
