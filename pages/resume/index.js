import { anchor as A } from "@/components/text/text";
import Button from "@/components/button/button";
import Container from "@/components/container";
import Head from "next/head";
import Image from "@/components/mdxComponents/image";
import Layout from "@/components/layout";
import Link from "next/link";

export default function Resume() {
  return (
    <>
      <Layout>
        <Head>
          <title>sulaiman | resume</title>
        </Head>
        <Container>
          <div className='flex flex-col items-center'>
            <div className='mb-5'>
              <Button
                color='black'
                textColor='white'
                hoverColor='white'
                hoverBorderColor='black'
                hoverTextColor='black'
              >
                <Link passHref href='/resume.pdf'>
                  <A>Download Resume</A>
                </Link>
              </Button>
            </div>
            <Link href='/resume.pdf' passHref>
              <A>
                <div className='shadow-md w-max cursor-pointer'>
                  <Image
                    alt='Resume'
                    width='400'
                    height='500'
                    src='/assets/personal/resume.png'
                  />
                </div>
              </A>
            </Link>
            <div className='mt-5'>
              <A blue outerLink href='https://github.com/sulaimanh'>
                GitHub
              </A>
              <A
                className='ml-3'
                blue
                outerLink
                href='https://www.linkedin.com/in/sulaimanhamouda/'
              >
                LinkedIn
              </A>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}
