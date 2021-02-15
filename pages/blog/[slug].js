import {
  anchor as A,
  headingPrimary as H1,
  headingSecondary as H2,
  headingTertiary as H3,
  headingQuaternary as H4,
  mediumParagraph as MP,
  paragraph as P
} from "../../components/text/text";
import { orderedList as OL, unorderedList as UL } from "@/components/list/list";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { useEffect, useState } from "react";

import Blockquote from "@/components/mdxComponents/blockquote";
import CodeBlock from "@/components/mdxComponents/code-block";
import CodeSnippet from "@/components/mdxComponents/code-snippet";
import Comments from "@/components/blog/comments";
import Container from "../../components/container";
import ErrorPage from "next/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Highlight from "@/components/mdxComponents/highlight";
import Hr from "@/components/mdxComponents/hr";
import Image from "@/components/mdxComponents/image";
import Layout from "../../components/layout";
import Link from "next/link";
import LinkInner from "@/components/mdxComponents/LinkInner";
import LinkOuter from "@/components/mdxComponents/LinkOuter";
import PostBody from "../../components/blog/post-body";
import PostHeader from "../../components/blog/post-header";
import PostTitle from "../../components/blog/post-title";
import ProgressBar from "@/components/progressbar";
import Quote from "@/components/mdxComponents/quote";
import Section from "@/components/mdxComponents/section";
import Subscribe from "@/components/subscribe/subscribe";
import TableOfContents from "@/components/mdxComponents/tableofcontents";
import Tag from "@/components/mdxComponents/tag";
import background from "@/components/mdxComponents/background";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import hydrate from "next-mdx-remote/hydrate";
import readingTime from "reading-time";
import renderToString from "next-mdx-remote/render-to-string";
import { useRouter } from "next/router";

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  mp: MP,
  a: A,
  LinkOuter: LinkOuter,
  LinkInner: LinkInner,
  ol: OL,
  ul: UL,
  q: Quote,
  hr: Hr,
  code: CodeBlock,
  codesnippet: CodeSnippet,
  blockquote: Blockquote,
  image: Image,
  background: background,
  highlight: Highlight,
  section: Section,
  TableOfContents: TableOfContents,
  Tag: Tag
};

export default function Post({ frontMatter, source }) {
  const [scroll, setScroll] = useState(0);
  const [showSubscribe, setShowSubscribe] = useState({
    scroll: false,
    exit: false
  });
  const router = useRouter();
  const content = hydrate(source, { components });

  useEffect(() => {
    const progressBar = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const s = `${totalScroll / windowHeight}`;
      if (s * 100 > 5 && !showSubscribe.scroll) {
        setShowSubscribe({ scroll: true, exit: showSubscribe.exit });
      }
      setScroll(s);
    };
    window.addEventListener("scroll", progressBar);
    return () => window.removeEventListener("scroll", progressBar);
  }, [scroll]);

  if (!router.isFallback && !frontMatter?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const url = `/blog`;
  return (
    <Layout>
      <ProgressBar scroll={scroll} />
      <div
        className={`${
          showSubscribe.scroll && !showSubscribe.exit
            ? "animate-fromBottom fixed bottom-5 right-0 "
            : "hidden"
        } z-40 mx-5 w-12/12 md:w-6/12 lg:w-4/12`}
      >
        <div className='w-full flex justify-end'>
          <FontAwesomeIcon
            icon={faTimes}
            size='lg'
            onClick={() =>
              setShowSubscribe({ scroll: showSubscribe.scroll, exit: true })
            }
            className='mr-4 mb-2 cursor-pointer hover:text-gray-700'
          />
        </div>
        <Subscribe />
      </div>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className='mb-16'>
              <Head>
                <title>sulaiman | {frontMatter.title}</title>
                <meta property='og:image' content={frontMatter.ogImage.url} />
              </Head>

              <PostHeader
                title={frontMatter.title}
                coverImage={frontMatter.coverImage}
                date={frontMatter.date}
                author={frontMatter.author}
                readingTime={frontMatter.readingTime}
                slug={frontMatter.slug}
              />
              <div className='max-w-2xl mx-auto'>
                <PostBody content={content} />
                <br />
                <br />
                <P className='font-bold'>Thank you for reading,</P>
                <br />
                <P className='font-bold'>Sulaiman Hamouda</P>
              </div>
              <hr className='my-10' />
            </article>
            <div className='max-w-2xl mx-auto mb-16'>
              <H3>Did you enjoy reading this post?</H3>
              <P className='mt-5'>
                Please consider sharing this with anyone who may benefit. Also,
                please leave a comment below. I would love to hear any feedback
                you may have and connect with you.
              </P>
            </div>

            <Comments slug={frontMatter.slug} />
            <Subscribe className='mt-16' />

            <P className='flex hover:underline cursor-pointer my-24 max-w-2xl mx-auto'>
              <Link passHref href={url}>
                <A>Back to posts</A>
              </Link>
            </P>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "section"
  ]);

  const mdxSource = await renderToString(post.content, {
    components
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        wordCount: post.content.split(/\s+/gu).length,
        readingTime: readingTime(post.content),
        ...post
      }
    }
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "section"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      };
    }),
    fallback: false
  };
}
