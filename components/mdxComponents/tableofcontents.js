import { anchor as A, headingSecondary as H2 } from "@/components/text/text";

import Link from "next/link";
import { useRouter } from "next/router";

export default function Table({ contents }) {
  const router = useRouter();

  return (
    <div className='relative 2xl:sticky 2xl:top-24'>
      <div className='relative 2xl:absolute 2xl:-right-96'>
        <H2>Table of Contents</H2>

        <ul className='list-disc bg-gray-100 py-7 px-5 rounded-lg'>
          {contents.map(({ title, id }) => {
            return (
              <li className='ml-5' key={id}>
                <div className='flex flex-col w-max'>
                  <Link
                    replace
                    passHref
                    href={`/blog/${router?.query.slug}#${id}`}
                  >
                    <A blue>{title}</A>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
