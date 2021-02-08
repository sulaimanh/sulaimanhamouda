import Avatar from "@/components/blog/avatar";
import CoverImage from "@/components/blog/cover-image";
import DateFormatter from "@/components/date-formatter";
import { mediumParagraph as MP } from "@/components/text/text";
import PostTitle from "@/components/blog/post-title";
import ViewCounter from "@/components/blog/view-counter";

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  readingTime,
  slug
}) {
  const viewCounter = (
    <MP className='text-gray-500 mr-3'>
      <ViewCounter slug={slug} />
    </MP>
  );

  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className='hidden md:block md:mb-8 md:flex md:justify-between items-center'>
        <Avatar name={author.name} picture={author.picture} />{" "}
        <div className='flex justify-end'>
          {viewCounter}
          <MP className='text-gray-500 mr-3'>|</MP>
          <MP className='text-gray-500'>{readingTime.text}</MP>
        </div>
      </div>

      <div className='mb-8 md:mb-16  max-w-4xl mx-auto'>
        <CoverImage
          className='rounded-b-lg'
          title={title}
          src={coverImage}
          height={620}
          width={1240}
        />
      </div>
      <div className='max-w-2xl mx-auto'>
        <div className='block md:hidden mb-6 flex justify-between items-center'>
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className='flex justify-between mb-5 md:hidden '>
          {viewCounter}
          <MP className='text-gray-500'>{readingTime.text}</MP>
        </div>
        <div className='mb-6 text-lg'>
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
