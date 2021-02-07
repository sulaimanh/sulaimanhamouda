import {
  headingTertiary as H3,
  mediumParagraph as MP
} from "@/components/text/text";

import Avatar from "@/components/blog/avatar";
import CoverImage from "@/components/blog/cover-image";
import DateFormatter from "@/components/date-formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { paragraph as P } from "@/components/text/text";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  section,
  views
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/blog/${slug}`)}
      className='transition duration-200 ease-in-out hover:shadow-sm rounded-lg cursor-pointer ring-2 ring-gray-100'
    >
      <div className='mb-5'>
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          height={278}
          width={556}
          section={section}
        />
      </div>
      <div className='p-5 pt-0'>
        <H3 className='mb-3'>
          <Link href={`/blog/${slug}`}>
            <a className='hover:underline'>{title}</a>
          </Link>
        </H3>
        <div className='text-lg mb-4 flex justify-between'>
          <DateFormatter dateString={date} />
          <MP className='text-gray-500'>{views} views</MP>
        </div>
        <P className='mb-4'>{excerpt}</P>
        <Avatar name={author.name} picture={author.picture} />
        <div className='flex justify-end w-full'>
          <P
            className='text-blue-500 cursor-pointer hover:underline'
            handler={() => router.push(`/blog/${slug}`)}
          >
            Read More <FontAwesomeIcon icon={faArrowCircleRight} />
          </P>
        </div>
      </div>
    </div>
  );
}
