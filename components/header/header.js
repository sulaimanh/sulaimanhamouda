import {
  anchor as A,
  headingTertiary as H3,
  headingQuaternary as H4,
  mediumParagraph as MD,
  paragraph as P
} from "@/components/text/text";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import Container from "../container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ModalHelper from "@/components/modal/modal";
import Support from "@/components/support/support";
import { routes } from "@/lib/routes";
import text from "@/locales/branding.json";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [showModal, setShowModal] = useState({
    show: false,
    component: <Support />
  });
  const [menu, setMenu] = useState(false);

  const sectionArr = router.asPath.split("/");
  const section = sectionArr[1] ? sectionArr[1] : "";

  const title = `${text.name}${section && ":" + section}`;
  const url = `/${section && section}`;

  return (
    <section
      className={`${
        menu
          ? "fixed top-0 z-40 w-full left-0 bg-white"
          : "sticky top-0 z-40 bg-white bg-opacity-90 mb-5"
      } `}
    >
      <Container>
        <div
          className={`z-40 w-full flex items-center justify-between pt-8 pb-8 md:pt-10 md:pb-10`}
        >
          <ModalHelper
            showModal={showModal.show}
            component={showModal.component}
            setShowModal={setShowModal}
            size='large'
          />
          <H3 className='md:text-2xl text-lg'>
            <Link as={url} href={url}>
              <a className='hover:underline'>{title}</a>
            </Link>
          </H3>
          <div className='flex items-center'>
            <div className='flex items-center'>
              <P className='md:flex mr-5 text-gray-700'>
                <Link as='/' href='/' passHref>
                  <A className={`hover:underline text-md text-gray-700`}>
                    home
                  </A>
                </Link>
              </P>
            </div>
            <div
              onClick={() => setMenu(!menu)}
              className='bg-gray-100 hover:shadow-sm px-3 py-2 rounded-lg cursor-pointer flex justify-center'
            >
              <FontAwesomeIcon icon={faBars} size='1x' />
            </div>
          </div>
        </div>
        {menu ? (
          <>
            <div className='flex flex-col mb-10 bg-white w-full z-50'>
              <div className='flex justify-between mb-4'>
                <H4>Menu</H4>
                <div className='cursor-pointer' onClick={() => setMenu(!menu)}>
                  <FontAwesomeIcon icon={faTimes} size='1x' />
                </div>
              </div>
              <div className='divide-y divide-gray-100'>
                {routes.map(({ title, icon, url }, index) => {
                  if (url) {
                    return (
                      <div key={index}>
                        <Link as={url} href={url} passHref>
                          <A className={`hover:underline`}>
                            <P className='block items-center px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer'>
                              <FontAwesomeIcon
                                icon={icon}
                                size='1x'
                                className='mr-3'
                              />
                              {title}
                            </P>
                          </A>
                        </Link>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index}>
                        <P
                          className='hover:underline items-center block px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer'
                          handler={() => {
                            if (title === "About Us") {
                              setMenu(false);
                              setShowModal({
                                show: true,
                                component: <About />
                              });
                            }
                          }}
                        >
                          <FontAwesomeIcon
                            icon={icon}
                            size='1x'
                            className='mr-3'
                          />
                          {title}
                        </P>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div
              onTouchStart={() => setMenu(!menu)}
              onClick={() => setMenu(!menu)}
              className='flex cursor-pointer h-screen w-screen absolute left-0 z-50 bg-gray-600 opacity-75'
            ></div>
          </>
        ) : null}
      </Container>
    </section>
  );
}
