import { anchor as A } from "@/components/text/text";

export default function LinkInner({ className, children, href }) {
  return (
    <A href={href} outerLink blue className={className}>
      {children}
    </A>
  );
}
