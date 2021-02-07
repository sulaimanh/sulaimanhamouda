import Link from "next/link";
import { useState } from "react";

export default function Dropdown({
  fields,
  title,
  handler,
  className,
  classNameButton,
  dropdownWidth
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='fixed z-50 left-0 top-0 w-full h-full '
        ></div>
      ) : null}
      <div>
        <div>
          <button
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className={`${className} inline-flex justify-between hover:bg-gray-50 focus:outline-none  px-4 py-3 text-sm font-medium text-gray-700 rounded-md border border-gray-300 ${dropdownWidth}`}
            id='options-menu'
            aria-haspopup='true'
            aria-expanded='true'
          >
            {title}
            <svg
              className='-mr-1 ml-2 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        {isOpen ? (
          <div className='z-50 absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
            <div
              className='py-1 divide-y divide-gray-100'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {fields.map((field, index) => (
                <Link key={index} href={field.url}>
                  <a
                    onClick={() => {
                      setIsOpen(!isOpen);
                      handler(field.title);
                    }}
                    className='block px-4 py-2 text-sm  hover:bg-gray-100 hover:text-gray-900'
                    role='menuitem'
                  >
                    {field.title}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
