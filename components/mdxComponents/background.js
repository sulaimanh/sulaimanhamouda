export default function Background({ children, text, className }) {
  return (
    <div className='flex flex-col justify-center rounded-lg bg-gray-100'>
      {children}
      <span className='px-4 py-2 font-bold text-sm sm:text-md leading-relaxed'>
        {text}
      </span>
    </div>
  );
}
