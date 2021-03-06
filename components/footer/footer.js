import {
  anchor as A,
  headingTertiary as H3,
  mediumParagraph as MP,
  paragraph as P
} from "@/components/text/text";

import Container from "../container";
import Link from "next/link";
import ModalHelper from "@/components/modal/modal";
import text from "@/locales/branding.json";
import { useState } from "react";

export default function Footer() {
  const [showModal, setShowModal] = useState({ show: false, component: null });
  return (
    <footer className='bg-accent-1 border-t border-accent-2'>
      <ModalHelper
        showModal={showModal.show}
        component={showModal.component}
        setShowModal={setShowModal}
        size={`${showModal.component === "support" ? "large" : ""}`}
      />
      <Container>
        <div className='flex flex-col pt-16 pb-16'>
          <div className='pb-16 flex justify-between flex-col lg:flex-row items-center'>
            <H3 className='text-4xl lg:text-5xl font-bold tracking-tighter text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2'>
              <Link href='/' passHref>
                <A className='hover:underline'>{text.footerName}</A>
              </Link>
            </H3>

            <div className='flex justify-center lg:justify-end w-1/2 text-center opacity-50'>
              {/* <P>{text.description}</P> */}
            </div>
          </div>
          <div className='flex justify-center'>
            {text.social.map((s, index) => (
              <div key={index} className='flex'>
                <MP className='pr-2 hover:underline text-black opacity-50'>
                  <A outerLink href={s.link}>
                    {s.name}
                  </A>
                </MP>
                {index === text.social.length - 1 ? null : (
                  <MP className='pr-2 text-black opacity-50'>•</MP>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
