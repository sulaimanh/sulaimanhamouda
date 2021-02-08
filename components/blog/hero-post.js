import {
  anchor as A,
  headingSecondary as H2,
  headingTertiary as H3,
  headingQuaternary as H4,
  mediumParagraph as MP,
  paragraph as P
} from "@/components/text/text";

import Avatar from "@/components/blog/avatar";
import CoverImage from "@/components/blog/cover-image";
import DateFormatter from "@/components/date-formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <section className='mb-16'>
      <H2>Recent Post</H2>
      <hr className='my-5' />
      <div className='relative grid grid-cols-1 md:grid-cols-2'>
        <div className='relative h-52 md:h-full'>
          <CoverImage
            title={title}
            src={coverImage}
            slug={slug}
            layout='fill'
            section={section}
            className='md:rounded-l-lg md:rounded-r-none'
          />
        </div>
        <div className='relative border-2 border-gray-100 p-5 md:rounded-r-lg md:rounded-b-none rounded-r-none rounded-b-lg'>
          <H3 className='mb-4'>
            <Link href={`/blog/${slug}`}>
              <a className='hover:underline'>{title}</a>
            </Link>
          </H3>
          <div className='flex flex-row justify-between md:flex-col mb-4 md:mb-3 text-lg'>
            <DateFormatter dateString={date} />
            <MP className='text-gray-500'>{views} views</MP>
          </div>
          <div>
            <P className='mb-1'>{excerpt}</P>
            <div className='flex justify-end w-full'>
              <MP className='text-blue-500 cursor-pointer hover:underline'>
                <Link href={`/blog/${slug}`}>
                  <A>
                    Read More <FontAwesomeIcon icon={faArrowCircleRight} />
                  </A>
                </Link>
              </MP>
            </div>
            <Avatar name={author.name} picture={author.picture} />
          </div>
        </div>
      </div>
    </section>
  );
}
