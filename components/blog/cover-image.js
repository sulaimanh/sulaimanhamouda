import Image from "next/image";
import Link from "next/link";

export default function CoverImage({
  title,
  src,
  slug,
  height,
  width,
  section
}) {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className='rounded-lg rounded-b-none'
      layout='responsive'
      width={width}
      height={height}
    />
  );
  return (
    <div className='sm:mx-0'>
      {slug ? (
        <Link as={`/blog/${slug}`} href={`/blog/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
