import {
  anchor as A,
  headingPrimary as H1,
  headingSecondary as H2,
  headingTertiary as H3,
  headingQuaternary as H4,
  mediumParagraph as MP,
  paragraph as P
} from "../../components/text/text";

import DateFormatter from "@/components/date-formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import fetcher from "@/lib/fetcher";
import { useAuth } from "@/lib/hooks/useAuth";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Comments({ slug }) {
  const [form, setForm] = useState({
    name: "",
    social: "",
    message: ""
  });
  const { user } = useAuth();
  const [status, setStatus] = useState({ state: "", message: "" });
  const { data } = useQuery(["comments", slug], () =>
    fetcher("/api/comments", {
      headers: {
        slug: slug
      },
      method: "GET"
    })
  );

  const submitForm = async (e) => {
    e.preventDefault();
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    setStatus({ state: "LOADING", message: "Loading" });
    const res = await fetcher("/api/comments", {
      body: JSON.stringify({
        name: form.name,
        social: form.social,
        message: form.message,
        slug: slug,
        today: today,
        time: new Date().getTime(),
        isAdmin: user
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    if (!user) {
      const f = e.target;
      const data = new FormData(f);
      const xhr = new XMLHttpRequest();
      xhr.open(f.method, f.action);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
          f.reset();
        } else {
        }
      };
      xhr.send(data);
    }

    const { error } = res;
    if (error) {
      setStatus({ state: "ERROR", message: error });
    } else {
      setStatus({ state: "SUCCESS", message: "" });
    }
    setForm({
      social: "",
      name: "",
      message: ""
    });
  };

  return (
    <>
      <div className='w-full p-5 flex flex-col bg-gray-100 rounded-lg rounded-b-none max-w-2xl mx-auto'>
        <H3 className='mb-3'>Comments</H3>
        <MP className='text-gray-500 text-center mb-5'>
          Don't be shy, leave a comment 😊. Let me know what you think about
          this article.
        </MP>
        {data?.comments.map(
          ({ name, message, social, status, date }, index) => {
            if (status !== "NEEDS APPROVAL") {
              return (
                <div
                  key={index}
                  className='w-full p-5 bg-white rounded-lg mb-5'
                >
                  <div className='flex flex-col md:flex md:flex-row justify-between w-full'>
                    <P className='font-bold'>{name}</P>
                    <MP className='ml-3 md:ml-0'>
                      <DateFormatter dateString={date} />
                    </MP>
                  </div>
                  <P className='ml-3'>{message}</P>
                  {social ? (
                    <div className='flex align-right justify-end w-full'>
                      <A
                        className='p-2 bg-gray-100 cursor-pointer rounded-lg hover:bg-gray-200'
                        outerLink
                        href={social}
                      >
                        Follow
                      </A>
                    </div>
                  ) : null}
                </div>
              );
            } else {
              return null;
            }
          }
        )}
      </div>
      <form
        onSubmit={(e) => submitForm(e)}
        className='w-full p-5 flex flex-col bg-gray-100 rounded-lg rounded-t-none max-w-2xl mx-auto'
        action={`https://formspree.io/f/xeqpdgdp`}
        method='POST'
      >
        <H3 className='mb-5'>Leave a comment</H3>
        <MP className='text-center'>
          Submit one of your social media accounts and lets connect (not
          required to leave a comment)
        </MP>
        <input
          onChange={(e) =>
            setForm({
              name: e.target.value,
              social: form.social,
              message: form.message
            })
          }
          value={form.name}
          required={user ? false : true}
          type='text'
          name='name'
          placeholder='*Name'
          className='p-2 pl-3 mt-3 mb-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
        />
        <input
          onChange={(e) =>
            setForm({
              name: form.name,
              social: e.target.value,
              message: form.message
            })
          }
          value={form.social}
          placeholder='Link to social media'
          type='url'
          name='social-media'
          className='p-2 pl-3 mb-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
        />
        <textarea
          onChange={(e) =>
            setForm({
              name: form.name,
              social: form.social,
              message: e.target.value
            })
          }
          type='text'
          name='message'
          rows='5'
          value={form.message}
          required
          placeholder='*Comment'
          className='p-2 pl-3 mb-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
        />
        <button
          className='bg-black px-5 py-2 w-full rounded-lg text-white mx-auto cursor-pointer hover:bg-transparent border border-2 border-black hover:text-black transition duration-150 ease-in-out'
          type='submit'
        >
          {status.state === "LOADING" ? (
            <FontAwesomeIcon icon={faSpinner} spin size='2x' />
          ) : (
            "Send"
          )}
        </button>
        {status.state === "SUCCESS" ? (
          <MP className='text-center'>
            Thank you for your comment. It will be posted within 24hrs.
          </MP>
        ) : null}
        {status.state === "ERROR" ? <MP>{status.message}</MP> : null}
      </form>
    </>
  );
}
