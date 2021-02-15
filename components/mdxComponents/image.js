import Image from "next/image";

export default function ImageView({ className, src, alt, width, height }) {
  return (
    <Image
      src={src}
      alt={alt}
      className={`rounded-lg ${className}`}
      width={width ? width : 2000}
      height={height ? height : 1333}
    />
  );
}
