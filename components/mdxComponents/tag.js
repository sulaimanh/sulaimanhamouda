import { anchor as A, headingSecondary as H2 } from "@/components/text/text";

import Link from "next/link";
import { useRouter } from "next/router";

export default function Tag({ title, id }) {
  const router = useRouter();

  return (
    <div id={id}>
      <H2 className='hover:underline cursor-pointer'>
        <Link href={`/blog/${router?.query.slug}/#${id}`}>
          <A>{title}</A>
        </Link>
      </H2>
    </div>
  );
}
