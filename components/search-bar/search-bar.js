export default function SearchBar({ search, handler, placeholder, className }) {
  return (
    <input
      className={`w-full px-4 py-2 focus:border-black rounded-md appearance-none focus:outline-none border border-gray-300 ${className}`}
      placeholder={placeholder}
      type='text'
      value={search}
      onChange={handler}
    />
  );
}
