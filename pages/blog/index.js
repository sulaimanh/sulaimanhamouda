import { useEffect, useState } from "react";

import BlogContainer from "@/components/blog/blog-container";
import Head from "next/head";
import Layout from "@/components/layout";
import fetcher from "@/lib/fetcher";
import { getAllPosts } from "@/lib/api";
import { useAuth } from "@/lib/hooks/useAuth";
import { useQuery } from "react-query";

export default function Index({ allPosts }) {
  const { data } = useQuery(["views"], () => fetcher("/api/views"));
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) {
      allPosts.forEach((post, index) => {
        if (post.isSubmitted === "false") {
          allPosts.splice(index, 1);
        }
      });
    }

    if (!loading) {
      setPosts(allPosts);
    }
  }, [loading]);

  return (
    <>
      <Layout>
        <Head>
          <title>sulaiman | blog</title>
        </Head>
        <BlogContainer views={data} sect='blog' allPosts={posts} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "section",
    "isSubmitted"
  ]);

  return {
    props: { allPosts }
  };
}
