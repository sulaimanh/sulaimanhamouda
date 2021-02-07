export function orderedList({ children, className }) {
  return <ol className='list-decimal ml-10'>{children}</ol>;
}

export function unorderedList({ children, className }) {
  return <ul className='list-disc ml-10'>{children}</ul>;
}
