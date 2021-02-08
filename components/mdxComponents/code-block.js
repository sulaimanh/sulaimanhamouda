import { mediumParagraph as MP, paragraph as P } from "@/components/text/text";
import { faExpandAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Code({ children }) {
  const [large, setLarge] = useState(false);
  return (
    <>
      {large ? (
        <div className='fixed z-40 inset-0 flex justify-center overflow-scroll'>
          <div
            onClick={() => setLarge(!large)}
            className='cursor-pointer fixed z-50 w-screen h-screen bg-gray-600 opacity-75'
          ></div>
          <div className='z-50 justify-center items-center flex relative w-full bg-gray-100 px-5 m-3 md:m-10 rounded-lg overflow-scroll'>
            <div
              onClick={() => setLarge(!large)}
              className='fixed top-10 right-10 md:top-16 md:right-16 cursor-pointer z-50 bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-1'
            >
              <FontAwesomeIcon
                className=' text-black'
                icon={faTimes}
                size='1x'
              />
            </div>
            <code className='flex w-full h-full'>
              <MP>{children}</MP>
            </code>
          </div>
        </div>
      ) : null}
      <div className='bg-gray-100 px-5  my-10 overflow-scroll rounded-lg'>
        <div className='w-full flex justify-end'>
          <div
            className='bg-gray-200 hover:bg-gray-300 w-min px-3 py-1 mt-5 rounded-lg cursor-pointer '
            onClick={() => setLarge(!large)}
          >
            <FontAwesomeIcon icon={faExpandAlt} />
          </div>
        </div>
        <code>
          <MP>{children}</MP>
        </code>
      </div>
    </>
  );
}
