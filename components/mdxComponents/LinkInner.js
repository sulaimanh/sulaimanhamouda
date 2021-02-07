import { anchor as A } from "@/components/text/text";
import Link from "next/link";

export default function LinkInner({ className, children, href }) {
  return (
    <Link passHref href={href}>
      <A blue className={className}>
        {children}
      </A>
    </Link>
  );
}
