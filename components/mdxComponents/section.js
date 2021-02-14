import { anchor as A, headingTertiary as H3 } from "@/components/text/text";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Section({ children, section, id }) {
  const router = useRouter();
  const routerId = router?.asPath.split("#")[1];
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (routerId === id) {
      setIsOpen(true);
    }
  }, [id === routerId]);

  return (
    <>
      <Link href={`/blog/${router?.query.slug}`} replace scroll={false}>
        <button
          id={id}
          className={`w-full pb-3 pl-3 md:pl-5 pr-10 hover:bg-gray-200 flex justify-between items-baseline cursor-pointer mb-3 rounded-md ${
            isOpen ? "bg-gray-200" : "bg-gray-100 "
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup='true'
          aria-expanded='true'
        >
          <H3>{section}</H3>
          <FontAwesomeIcon
            className={`transform transition-transform duration-700 ease-out ${
              isOpen ? "-rotate-180" : ""
            } animate-pulse`}
            icon={faCaretUp}
          />
        </button>
      </Link>
      <div
        className={`static transform transition-transform duration-1000 ease-out ${
          isOpen ? "inline" : "hidden"
        }`}
      >
        {children}
      </div>
    </>
  );
}
