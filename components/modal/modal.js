import React from "react";

const Modal = React.memo(
  ({ children, setShowModal, size, backgroundColor }) => {
    return (
      <div className='fixed z-50 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div
              onClick={setShowModal}
              className='absolute inset-0 bg-gray-600 opacity-75 cursor-pointer'
            ></div>
          </div>

          <div
            className={`p-5 inline-block bg-white rounded-lg text-left shadow-xl transform transition-all ${
              size === "large" ? "max-w-screen-lg" : "max-w-lg"
            } sm:mx-4 mx-0 ${backgroundColor}`}
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'
          >
            <div className='flex-row'>{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default function ModalHelper({
  showModal,
  component,
  setShowModal,
  size,
  backgroundColor
}) {
  return showModal ? (
    <Modal
      backgroundColor={backgroundColor}
      size={size}
      setShowModal={() => setShowModal(!showModal)}
    >
      {component}
    </Modal>
  ) : null;
}
