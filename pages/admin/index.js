import {
  headingQuaternary as H4,
  mediumParagraph as MP,
  paragraph as P
} from "@/components/text/text";

import Button from "@/components/button/button";
import DateFormatter from "@/components/date-formatter";
import Head from "next/head";
import Layout from "@/components/layout";
import fetcher from "@/lib/fetcher";
import { useAuth } from "@/lib/hooks/useAuth";
import useMutateCommentStatus from "@/lib/hooks/comments-approval";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Admin() {
  const { user, signIn, signOut } = useAuth();
  const { data } = useQuery(
    "comments",
    () =>
      fetcher("/api/comments/comments-admin", {
        method: "GET"
      }),
    {
      // - enabled is a boolean, so we are putting a double not to say true
      // - we wont run this query until we have a user logged in
      enabled: !!user
    }
  );

  const [sign, setSign] = useState({ email: "", password: "" });
  const [description, setDescription] = useState({
    status: "",
    description: ""
  });
  const mutate = useMutateCommentStatus();

  if (!user) {
    return (
      <>
        <Head>
          <title>sulaiman | admin</title>
        </Head>
        <Layout className='mx-5'>
          <div className='max-w-lg mx-auto mt-24 flex flex-col border border-2 border-gray-100 bg-gray-100 p-5 rounded-lg'>
            <H4 className='text-center mb-5'>Sign In</H4>

            <input
              className='py-2 px-3 rounded-lg mb-5 focus:outline-none '
              value={sign.email}
              onChange={(e) =>
                setSign({
                  email: e.target.value,
                  password: sign.password
                })
              }
              placeholder='Email'
              type='email'
            />
            <input
              className='py-2 px-3 rounded-lg mb-5 focus:outline-none '
              value={sign.password}
              onChange={(e) =>
                setSign({
                  password: e.target.value,
                  email: sign.email
                })
              }
              placeholder='Password'
              type='password'
            />
            <Button
              color='black'
              textColor='white'
              hoverColor='gray-800'
              className='w-full'
              handler={() => signIn(sign.email, sign.password)}
            >
              Sign In
            </Button>
          </div>
        </Layout>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Head>
          <title>sulaiman | admin</title>
        </Head>
        <Layout className='mx-5'>
          <div className='max-w-2xl mx-auto'>
            <H4>Loading...</H4>
          </div>
        </Layout>
      </>
    );
  }

  const submitDescriptionHandler = async () => {
    const data = await fetcher("/api/upcoming", {
      body: JSON.stringify({
        description: description
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    console.log(data);

    setDescription({ description: "", status: data.status });
  };

  const handleButtonClick = (obj) => {
    mutate.mutate(obj);
  };

  return (
    <>
      <Head>
        <title>sulaiman | admin</title>
      </Head>
      <Layout className='mx-5'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex justify-end mb-2'>
            <Button
              color='black'
              hoverColor='gray-800'
              textColor='white'
              borderColor='black'
              handler={() => {
                signOut();
              }}
            >
              Sign Out
            </Button>
          </div>
          <H4 className='mb-3'>Upcoming Description</H4>
          <div className='flex flex-col w-full bg-gray-100 py-3 px-5 mb-5'>
            <input
              className='py-2 px-3 rounded-lg mb-2 focus:outline-none '
              value={description.description}
              onChange={(e) =>
                setDescription({
                  description: e.target.value,
                  status: description.status
                })
              }
              placeholder='Description'
              type='text'
            />
            <MP className='text-center my-1 text-blue-500'>
              {description.status}
            </MP>
            <Button
              handler={submitDescriptionHandler}
              color='black'
              hoverColor='gray-800'
              textColor='white'
            >
              Submit
            </Button>
          </div>
          <div className='mb-5'>
            <H4>Comments</H4>
          </div>
          {data.arr.map((post, index) => (
            <div
              key={index}
              className='w-full p-5 rounded-lg shadow-sm mb-5 border border-2 border-gray-200'
            >
              <div className='flex justify-between items-center'>
                <H4>{post.slug}</H4>
                {post.status === "NEEDS APPROVAL" ? (
                  <Button
                    handler={() =>
                      handleButtonClick({
                        slug: post.slug,
                        status: "APPROVED",
                        timestamp: post.timestamp
                      })
                    }
                    textColor='red-500'
                    hoverTextColor='white'
                    hoverBorderColor='green-500'
                    hoverColor='green-500'
                    borderColor='red-600'
                  >
                    Needs Approval
                  </Button>
                ) : (
                  <Button
                    handler={() =>
                      handleButtonClick({
                        slug: post.slug,
                        status: "NEEDS APPROVAL",
                        timestamp: post.timestamp
                      })
                    }
                    textColor='green-500'
                    hoverTextColor='white'
                    borderColor='green-500'
                    hoverBorderColor='red-600'
                    hoverTextColor='white'
                    hoverColor='red-600'
                  >
                    Approved
                  </Button>
                )}
              </div>
              <MP>{post.name}</MP>
              <MP>{post.social}</MP>
              <MP>
                <DateFormatter dateString={post.date} />
              </MP>
              <P className='mt-3'>{post.message}</P>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
