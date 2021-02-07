import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paragraph as P } from "@/components/text/text";
import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = React.memo(({ children, setShowModal, size }) => {
  return (
    <div className='fixed z-50 inset-0 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div
            onClick={setShowModal}
            className='absolute inset-0 bg-gray-600 opacity-75'
          ></div>
        </div>

        <div
          className={`p-10 inline-block bg-white rounded-lg text-left shadow-xl transform transition-all ${
            size === "large" ? "max-w-screen-lg" : "max-w-lg"
          } sm:mx-4 mx-0`}
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div className='flex-row'>
            <P
              handler={setShowModal}
              className='absolute top-0 right-0 mr-10 mt-8 hover:underline cursor-pointer'
            >
              <FontAwesomeIcon icon={faTimes} size='1x' />
            </P>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function ModalHelper({
  showModal,
  component,
  setShowModal,
  size
}) {
  return showModal ? (
    <Modal size={size} setShowModal={() => setShowModal(!showModal)}>
      {component}
    </Modal>
  ) : null;
}
