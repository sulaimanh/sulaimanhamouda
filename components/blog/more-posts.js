import { headingSecondary as H2 } from "@/components/text/text";
import PostPreview from "@/components/blog/post-preview";

export default function MoreStories({ posts }) {
  return (
    <section>
      <div className='flex items-center'>
        <H2 className='mr-5'>More Posts</H2>
      </div>
      <hr className='my-8' />
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-22 gap-y-10 md:gap-y-24 mb-24'>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            section={post.section}
            views={post.views}
          />
        ))}
      </div>
    </section>
  );
}
