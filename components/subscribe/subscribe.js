import {
  headingTertiary as H3,
  mediumParagraph as MP,
  paragraph as P
} from "@/components/text/text";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "@/components/input/input";
import fetcher from "@/lib/fetcher";
import text from "@/locales/branding.json";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

export default function Subscribe({ show, handler, className }) {
  const [status, setStatus] = useState({ state: "", message: "" });
  const [email, setEmail] = useState("");
  const textInput = useRef();
  const router = useRouter();
  const { data } = useQuery("subscribers", () =>
    fetcher("/api/subscribe/subscribers")
  );

  console.log(email);

  useEffect(() => {
    if (router.pathname === "/") {
      textInput?.current?.focus();
    }
  }, []);

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
      className={`relative flex flex-col py-5 px-7 bg-gray-100 w-full max-w-2xl mx-auto rounded-lg  ${className} `}
    >
      {show ? (
        <div className='absolute right-5 flex items-center '>
          <MP className='text-gray-400 mr-5'>
            {data ? data.subscribers : "--"} subscribers
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
          {data ? data.subscribers : "--"} subscribers
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
              <Input
                ref={textInput}
                handler={(e) => setEmail(e.target.value)}
                type='email'
                name='_replyto'
                placeholder='example@example.com'
                required={true}
              />
              <button
                disabled={status.state === "LOADING" ? true : false}
                className='bg-black px-5 py-2 w-full rounded-lg text-white mx-auto hover:bg-gray-900 hover:shadow-lg transition duration-150 ease-in-out'
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
                      You will start to receive emails from <b>{text.email}</b>
                    </MP>
                  </div>
                )}
                {status.state === "ERROR" && (
                  <MP className='text-red-600 font-bold text-center'>
                    {status.message}
                  </MP>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
