export default function Blockquote({ children, className }) {
  return (
    <blockquote
      className={`bg-gray-100 rounded-lg rounded-l-none border-l-4 border-black p-5 mt-10 ${className}`}
    >
      {children}
    </blockquote>
  );
}
