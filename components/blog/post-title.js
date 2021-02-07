import { headingPrimary as H1 } from "@/components/text/text";

export default function PostTitle({ children }) {
  return (
    <H1 className='md:leading-none mb-12 text-center md:text-left'>
      {children}
    </H1>
  );
}
