import BlogContainer from "@/components/blog/blog-container";
import Head from "next/head";
import Layout from "@/components/layout";
import fetcher from "@/lib/fetcher";
import { getAllPosts } from "@/lib/api";
import { useQuery } from "react-query";

export default function Index({ allPosts }) {
  const { data } = useQuery(["views"], () => fetcher("/api/views"));

  return (
    <>
      <Layout>
        <Head>
          <title>sulaiman | blog</title>
        </Head>
        <BlogContainer views={data} sect='blog' allPosts={allPosts} />
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
    "section"
  ]);

  return {
    props: { allPosts }
  };
}
