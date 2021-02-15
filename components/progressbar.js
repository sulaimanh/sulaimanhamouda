export default function Progress({ scroll }) {
  return (
    <div className='fixed top-0 z-50 w-screen bg-gray-200 h-1'>
      <div style={{ width: `${scroll * 100}%` }} className='h-1  bg-orange'>
        &nbsp;
      </div>
    </div>
  );
}
