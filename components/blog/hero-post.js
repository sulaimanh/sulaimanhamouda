import {
  anchor as A,
  mediumParagraph as MP,
  paragraph as P
} from "@/components/text/text";

import Avatar from "@/components/blog/avatar";
import CoverImage from "@/components/blog/cover-image";
import DateFormatter from "@/components/date-formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { headingSecondary as H2 } from "@/components/text/text";
import { headingTertiary as H3 } from "@/components/text/text";
import Link from "next/link";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  section,
  views
}) {
  return (
    <section>
      <H2>Recent Post</H2>
      <hr className='my-5' />

      <CoverImage
        title={title}
        src={coverImage}
        slug={slug}
        height={620}
        width={1240}
        section={section}
      />
      <div className='pt-9 p-5 rounded-lg rounded-t-none mb-16 md:mb-16 border-2 border-gray-100'>
        <div className='md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8'>
          <div>
            <H3 className='mb-4  lg:text-6xl'>
              <Link href={`/blog/${slug}`}>
                <a className='hover:underline'>{title}</a>
              </Link>
            </H3>
            <div className='flex flex-col mb-4 md:mb-0 text-lg'>
              <DateFormatter dateString={date} />
              <MP className='text-gray-500'>{views} views</MP>
            </div>
          </div>
          <div>
            <P className='mb-4'>{excerpt}</P>
            <Avatar name={author.name} picture={author.picture} />
          </div>
        </div>
        <div className='flex justify-end w-full'>
          <P className='text-blue-500 cursor-pointer hover:underline'>
            <Link href={`/blog/${slug}`}>
              <A>
                Read More <FontAwesomeIcon icon={faArrowCircleRight} />
              </A>
            </Link>
          </P>
        </div>
      </div>
    </section>
  );
}
