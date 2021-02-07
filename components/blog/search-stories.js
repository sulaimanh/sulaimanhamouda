import {
  anchor as A,
  headingTertiary as H3,
  headingQuinary as H5,
  mediumParagraph as MP,
  paragraph as P
} from "@/components/text/text";

import DateFormatter from "@/components/date-formatter";
import Link from "next/link";

export default function MoreStories({ posts }) {
  if (posts.length === 0) {
    return (
      <div className='max-w-2xl mx-auto mb-16'>
        <H3>Search</H3>
        <div className='text-center mt-16'>
          <H3>Looks like there are no posts yet</H3>
        </div>
      </div>
    );
  }
  return (
    <section>
      <div className='max-w-2xl mx-auto mb-16'>
        <H3>Search</H3>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} passHref key={post.slug}>
            <A>
              <div className='p-5 my-5 border border-gray-200 hover:border-black rounded-lg'>
                <div className='flex flex-col mb-2'>
                  <H5>{post.title}</H5>
                  <MP className='text-gray-500'>
                    <DateFormatter dateString={post.date} />
                  </MP>
                </div>
                <P>{post.excerpt}</P>
              </div>
            </A>
          </Link>
        ))}
      </div>
    </section>
  );
}
