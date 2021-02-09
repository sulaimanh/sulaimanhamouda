import {
  anchor as A,
  headingPrimary as H1,
  headingSecondary as H2,
  headingTertiary as H3,
  mediumParagraph as MP,
  paragraph as P
} from "@/components/text/text";

import Container from "../components/container";
import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
import ModalHelper from "@/components/modal/modal";
import Subscribe from "@/components/subscribe/subscribe";
import { routes } from "@/lib/routes";
import text from "@/locales/branding.json";
import { useState } from "react";

export default function Index() {
  const [showModal, setShowModal] = useState({ show: false, component: null });
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <>
      <ModalHelper
        showModal={showModal.show}
        component={showModal.component}
        setShowModal={setShowModal}
        size={`${showModal.component === "support" ? "large" : ""}`}
      />
      <Layout>
        <Head>
          <title>{text.name}</title>
        </Head>
        <Container>
          <div className='flex md:mt-16 mt-10'>
            <div className='flex-row relative'>
              <H1 className='transition duration-500 ease-in-out hover:translate-x-96 '>
                {text.name}
                <Link passHref href='/admin'>
                  <A>.</A>
                </Link>
              </H1>
              <div className='w-max'>
                {routes.map(({ url, title }, index) => {
                  return (
                    <div key={index}>
                      <H2 className='hover:underline cursor-pointer'>
                        <Link passHref href={url}>
                          <A>{title}.</A>
                        </Link>
                      </H2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>

        <div
          className={`${
            !showSubscribe ? "absolute" : "relative"
          } bottom-0 flex md:py-12 py-5 w-full`}
        >
          <Container className='flex flex-col justify-center'>
            {showSubscribe ? (
              <div className=''>
                <Subscribe show={true} handler={() => setShowSubscribe()} />
              </div>
            ) : null}
            <div className='flex justify-center mt-5'>
              {text.social.map((s, index) => (
                <div key={index} className='flex'>
                  <MP className='pr-2 hover:underline text-black opacity-50'>
                    <A outerLink href={s.link}>
                      {s.name}
                    </A>
                  </MP>
                  <MP className='pr-2 text-black opacity-50'>•</MP>
                </div>
              ))}

              <MP
                handler={() => setShowSubscribe(!showSubscribe)}
                className='pr-2 hover:underline cursor-pointer text-black opacity-50'
              >
                subscribe
              </MP>
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
}
