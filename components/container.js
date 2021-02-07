export default function Container({ children, className }) {
  return (
    <div className={`xl:container xl:px-44 mx-auto px-5 sm:px-10 ${className}`}>
      {children}
    </div>
  );
}
