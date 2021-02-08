export default function Code({ children, className }) {
  return (
    <code
      className={`text-sm sm:text-md leading-relaxed bg-gray-100 w-min rounded-md py-1 px-1 ${className}`}
    >
      {children}
    </code>
  );
}
