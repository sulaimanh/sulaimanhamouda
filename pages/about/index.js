import {
  anchor as A,
  headingSecondary as H2,
  headingTertiary as H3,
  mediumParagraph as MP,
  paragraph as P
} from "@/components/text/text";
import { useEffect, useState } from "react";

import Container from "@/components/container";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";
import Link from "next/link";
import Subscribe from "@/components/subscribe/subscribe";
import fetcher from "@/lib/fetcher";
import { useAuth } from "@/lib/hooks/useAuth";
import { useQuery } from "react-query";

export default function About() {
  const [showSubscibe, setShowSubscibe] = useState(false);
  const { user, loading } = useAuth();
  const data = useQuery(
    ["views", "about"],
    () =>
      fetcher(`/api/views/about`, {
        method: "POST"
      }),
    {
      enabled: !loading && !user
    }
  );

  return (
    <>
      <Head>
        <title>sulaiman | about</title>
      </Head>
      <Layout>
        <Container className='mb-24'>
          <div className='max-w-2xl mx-auto'>
            <div className='flex justify-between items-end mb-5'>
              <H2>About Me</H2>
              <Image
                alt='Image of me'
                src='/assets/blog/authors/sulaiman.jpg'
                height='150'
                width='150'
                className='rounded-full text-center'
              />
            </div>
            <P>
              Hey there, it is great to meet you! I'm Sulaiman. Some people know
              me as Sulai, Sully, King Sulaiman, Sulai the Great, Sulai the
              Magnificent.... Okay, they may not call me all of those names 😂.
              I am a husband, a learner, a developer, and a writer.
            </P>
            <br />
            <hr className='my-10 mt-5' />
            {/* <H3 className='mb-3'>Tech</H3>
            <P>
              I have been developing React applications for the past 3 years.
            </P>
            <br />
            <hr className='my-10 mt-5' /> */}
            <H3 className='mb-3'>Work</H3>
            <P>
              I currently work at{" "}
              <A href='https://www.nexteraenergy.com/'>
                <span className='text-blue-500 hover:text-blue-600 underline cursor-pointer'>
                  <b>NextEra Energy</b>
                </span>
              </A>{" "}
              as a Software Engineer. I am currently developing the Energy
              Analyzer and Energy Simulator. An app which will allow customers
              monitor their energy usage and simulate future cases. Users are
              able to see a disaggregation of their energy usage and how much
              money they spend in each category, giving them the opportunity to
              potentially lower their monthly bill.
            </P>
            <br />
            <P>
              Due to the pandemic, I have been working from home for more than
              75% of the time. What a learning experience this has been for me.
              Communicating and working with your colleagues productively is key
              for every successful team. The pandemic has surely taught me that.
              Thankfully, I have a great team who all got along. I still feel a
              bit salty towards those people who have never responded to my
              email or left me on read on the Teams app 😂. Please visit my{" "}
              <Link passHref href='/blog'>
                <A className='text-blue-500 underline cursor-pointer hover:text-blue-600'>
                  <b>blog</b>
                </A>
              </Link>{" "}
              as I write more about my experiences at work.
            </P>
            <br />
            <hr className='my-10' />
            <H3 className='mb-3'>Personal</H3>
            <P>
              Apart from work, I love spending time with loved ones,
              snowboarding (too bad it doesn't snow in South Florida 🏝), working
              on fun side projects, reading, and{" "}
              <span
                className='text-blue-500 underline cursor-pointer hover:text-blue-600'
                onClick={() => setShowSubscibe(!showSubscibe)}
              >
                <b>writing</b>
              </span>
              . <br /> <br />I got married in January 2020 ❤️... what a year
              2020 was... Started off great, but then got hit with a pandemic.
              Thankfully, my family and I are healthy physically, mentally, and
              spiritually. We used this time to build our skills and get closer
              with one another.
            </P>
            {showSubscibe ? (
              <Subscribe
                className='md:w-full mt-5'
                show={true}
                handler={() => setShowSubscibe(!showSubscibe)}
              />
            ) : null}

            <div className='my-10 flex flex-col justify-center rounded-lg bg-gray-100'>
              <Image
                src='/assets/personal/me.JPG'
                className='rounded-lg'
                height={420}
                width={640}
              />
              <MP className='ml-5 my-2'>
                <b>Snowboarding in Colorado</b>
              </MP>
            </div>
            <hr className='my-10' />
            <H3 className='mb-3'>School</H3>
            <P>
              I graduated from the University of Central Florida (UCF) with a
              degree in Computer Science. My college experience was a very
              important part in my personal and technical development. This was
              the first time I would ever be living alone, so that meant I had
              to take care of the things that my beautiful parents ❤️ used to
              take care of. I also learned how to manage my time efficiently and
              effectively.
            </P>
            <br />
            <P>
              I no longer had someone telling me what to do anymore. That kind
              of freedom could either benefit or harm someone. Thankfully, my
              parents have instilled within me a strong internal locus of
              control. I understood that my output was directly related to my
              input. My knowledge was simply a reflection of the effectiveness
              of my preparation. I write more about my college experience in my
              blog. I write about school, living alone, managing my social life
              and my studies, and much more. Please visit my{" "}
              <Link passHref href='/blog'>
                <A className='text-blue-500 hover:text-blue-600 underline cursor-pointer'>
                  <b>blog</b>
                </A>
              </Link>{" "}
              to read more 😊.
            </P>
            <br />
            <H3 className='my-3'>Thank you.</H3>
            <P>
              Thank you for taking the time to get to know me. You can visit my
              blog to read my posts. I write about tech, experiences from work
              and school, advice for students, and much more.
            </P>
            <br />
            <P>
              You can also subscribe to my newsletter to get updates of when I
              post a new article and other cool stuff.
            </P>

            <Subscribe className='md:w-full mt-24' />
          </div>
        </Container>
      </Layout>
    </>
  );
}
