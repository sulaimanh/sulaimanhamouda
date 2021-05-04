import { anchor as A } from "@/components/text/text";
import Button from "@/components/button/button";
import Container from "@/components/container";
import Head from "next/head";
import Image from "@/components/mdxComponents/image";
import Layout from "@/components/layout";

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
                handler={() => {
                  window.location.href = "https://sulaimanhamouda/resume.pdf";
                }}
              >
                Download Resume
              </Button>
            </div>
            <div
              className='shadow-md w-max cursor-pointer'
              onClick={() => {
                window.location.href = "https://sulaimanhamouda/resume.pdf";
              }}
            >
              <Image
                alt='Resume'
                width='400'
                height='500'
                src='/assets/personal/resume.png'
              />
            </div>
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
