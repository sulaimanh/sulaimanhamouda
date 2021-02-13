import Highlight, { defaultProps } from "prism-react-renderer";
import { faExpandAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mediumParagraph as MP } from "@/components/text/text";
import React from "react";
import theme from "@/components/blog/theme";

const getParams = (className = ``) => {
  const [lang = ``, params = ``] = className.split(`:`);
  return [lang.split(`language-`).pop()].concat(params);
};

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta) => {
  if (!RE.test(meta)) {
    return () => false;
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));
  return (index) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};

export default function Code({ children, className, metastring }) {
  const [large, setLarge] = useState(false);

  useEffect(() => {
    const x = document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && large) {
        setLarge(!large);
      }
    });

    return () => document.removeEventListener("keydown", x);
  });

  const [language, title] = getParams(className);

  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  return (
    <>
      {large ? (
        <div className='fixed z-40 inset-0 flex justify-center overflow-scroll'>
          <div
            onClick={() => setLarge(!large)}
            className='cursor-pointer fixed z-30 w-screen h-screen bg-gray-600 opacity-75'
          ></div>
          <button
            onClick={() => setLarge(!large)}
            className='fixed top-10 right-10 md:top-16 md:right-16 cursor-pointer z-50 bg-gray-200 hover:bg-gray-300 rounded-lg px-3 py-1'
          >
            <FontAwesomeIcon className=' text-black' icon={faTimes} size='1x' />
          </button>
          <Highlight
            {...defaultProps}
            theme={theme}
            code={children}
            language={language}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`${className} relative w-full z-40 px-5 m-3 md:m-10 rounded-lg overflow-scroll text-sm`}
                style={{ ...style, padding: "20px" }}
              >
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i });

                  if (shouldHighlightLine(i)) {
                    lineProps.className = `${lineProps.className} highlight-line`;
                  }
                  return (
                    <div key={i} {...lineProps}>
                      <span className='ml-1 mr-5 text-white text-opacity-30'>
                        {i + 1}
                      </span>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        </div>
      ) : null}

      <div className='bg-orange rounded-t-lg relative w-full flex justify-between items-center h-14'>
        <MP className='ml-5'>{title}</MP>
        <div
          className='bg-gray-100 mr-3 hover:bg-gray-300 w-10 px-3 py-1 rounded-lg cursor-pointer'
          onClick={() => setLarge(!large)}
        >
          <FontAwesomeIcon icon={faExpandAlt} />
        </div>
      </div>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={children}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} px-5  overflow-scroll rounded-b-lg text-sm`}
            style={{ ...style, padding: "20px" }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });

              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`;
              }
              return (
                <div key={i} {...lineProps}>
                  <span className='ml-1 mr-5 text-white text-opacity-30'>
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </>
  );
}
