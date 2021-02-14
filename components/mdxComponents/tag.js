import { anchor as A, headingSecondary as H2 } from "@/components/text/text";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Tag({ title, id }) {
  const router = useRouter();

  return (
    <div id={id}>
      <H2 className='title flex items-center hover:underline cursor-pointer w-max'>
        <div className='mr-2'>
          <Link href={`/blog/${router?.query.slug}/#${id}`}>
            <A>{title}</A>
          </Link>
        </div>
        <div className='paperclip hidden'>
          <FontAwesomeIcon icon={faPaperclip} size='sm' color='bg-gray-100' />
        </div>
      </H2>
    </div>
  );
}
