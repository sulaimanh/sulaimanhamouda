import {
  anchor as A,
  headingTertiary as H3,
  mediumParagraph as MP,
  paragraph as P
} from "@/components/text/text";

import Container from "@/components/container";
import Dropdown from "@/components/dropdown/dropdown";
import HeroPost from "@/components/blog/hero-post";
import Link from "next/link";
import MoreStories from "@/components/blog/more-posts";
import SearchBar from "@/components/search-bar/search-bar";
import SearchStories from "@/components/blog/search-stories";
import Subscribe from "@/components/subscribe/subscribe";
import { blogRoutes } from "@/lib/routes";
import { useState } from "react";

export default function Index({ allPosts, sect, views }) {
  const [search, setSearch] = useState("");

  allPosts.forEach((post, index) => {
    for (let key in views) {
      if (post.slug === key) {
        post.views = views[key];
      }
    }
  });

  const [chosen, setChosen] = useState(blogRoutes[0].title);

  const posts =
    chosen !== "all posts"
      ? allPosts.filter(({ section }) => chosen === section)
      : allPosts;

  const filteredPosts = posts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((frontMatter) =>
      frontMatter.title.toLowerCase().includes(search.toLowerCase())
    );

  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  return (
    <Container>
      <div className='flex flex-col justify-between mb-5'>
        <div className='flex w-full'>
          <Dropdown
            className='rounded-r-none w-36'
            fields={blogRoutes}
            title={chosen}
            handler={(selected) => {
              setChosen(selected);
              setSearch("");
            }}
          />
          <SearchBar
            className='rounded-l-none'
            search={search}
            handler={(e) => {
              setSearch(e.target.value);
            }}
            placeholder='Search'
          />
        </div>
      </div>
      {/* <div className='w-full flex justify-end'>
        <MP>
          <Link href='/blog/welcome' passHref>
            <A blue>Read my Welcome post!</A>
          </Link>
        </MP>
      </div> */}
      {heroPost && !search && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
          section={heroPost.section}
          views={heroPost.views}
        />
      )}
      {morePosts.length > 0 && !search && <MoreStories posts={morePosts} />}
      {filteredPosts.length === 0 && !search && (
        <div className='max-w-2xl mx-auto mb-16'>
          <H3>Search</H3>
          <div className='text-center mt-16'>
            <H3>Looks like there are no posts yet</H3>
            <P className='mt-3'>There will be posts about {chosen} soon.</P>
          </div>
        </div>
      )}
      {search && <SearchStories posts={filteredPosts} />}
      <div className='mb-24'>
        <Subscribe />
      </div>
    </Container>
  );
}
