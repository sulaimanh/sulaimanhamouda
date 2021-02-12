export default function Highlight({ children, className }) {
  return <span className={`highlight-line ${className}`}>{children}</span>;
}
