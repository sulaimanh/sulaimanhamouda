import {
  headingTertiary as H3,
  mediumParagraph as MP,
  paragraph as P
} from "@/components/text/text";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetcher from "@/lib/fetcher";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Subscribe({ show, handler, className }) {
  const [status, setStatus] = useState({ state: "", message: "" });
  const [email, setEmail] = useState("");
  const { data } = useQuery("subscribers", () =>
    fetcher("/api/subscribe/subscribers")
  );

  const submitForm = async (e) => {
    e.preventDefault();
    setStatus({ state: "LOADING", message: "Loading" });
    const res = await fetcher("/api/subscribe", {
      body: JSON.stringify({
        email: email
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    const { error } = res;
    if (error) {
      setStatus({ state: "ERROR", message: error });
      setEmail("");
    } else {
      setStatus({ state: "SUCCESS", message: "" });
      setEmail("");
    }
  };

  return (
    <div
      className={`relative flex flex-col py-5 px-7 bg-gray-100 w-full max-w-2xl mx-auto rounded-lg  ${className}`}
    >
      {show ? (
        <div className='absolute right-5 flex items-center '>
          <MP className='text-gray-400 mr-5'>
            {data?.subscribers.count} subscribers
          </MP>
          <FontAwesomeIcon
            onClick={handler}
            icon={faTimes}
            size='1x'
            className='cursor-pointer'
          />
        </div>
      ) : (
        <MP className=' absolute right-5 text-gray-400'>
          {data?.subscribers.count} subscribers
        </MP>
      )}
      <div className='flex flex-col md:flex md:flex-row'>
        <div className='w-full flex flex-col  justify-center'>
          <div className='flex flex-col items-center'>
            <form
              onSubmit={(e) => submitForm(e)}
              className='flex flex-col w-full '
              method='POST'
            >
              <H3 className='mb-3'>Subscribe</H3>
              <P className='w-11/12'>
                Subscribe to my newsletter to receive updates on new blog posts,
                tutorial updates, and other cool stuff.
              </P>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='p-2 pl-3 my-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                type='email'
                name='_replyto'
                placeholder='example@example.com'
                required
              />
              <button
                disabled={status.state === "LOADING" ? true : false}
                className='bg-black px-5 py-2 w-full rounded-lg text-white mx-auto cursor-pointer hover:bg-transparent border border-2 border-black hover:text-black transition duration-150 ease-in-out'
                type='submit'
              >
                {status.state === "LOADING" ? (
                  <FontAwesomeIcon icon={faSpinner} spin size='2x' />
                ) : (
                  "Send"
                )}
              </button>
              <div className='mt-5 mx-auto t'>
                {status.state === "SUCCESS" && (
                  <div className='mx-auto text-center'>
                    <MP>Thank you for signing up!</MP>
                    <MP>
                      You will start to receive emails from{" "}
                      <b>hamouda.sulaiman@gmail.com</b>
                    </MP>
                  </div>
                )}
                {status.state === "ERROR" && (
                  <MP className='text-red-600 font-bold'>{status.message}</MP>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
