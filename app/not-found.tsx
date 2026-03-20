import Link from 'next/link';
export default function NotFound() {
  return (
    <div className='min-h-screen bg-blue-950 flex items-center justify-center px-4'>
      <div className='text-center'>
        <p className='text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4'>404 — Page Not Found</p>
        <h1 className='text-4xl font-bold text-white mb-4'>Oops, lost in space!</h1>
        <p className='text-blue-300 text-sm mb-8'>The page you are looking for does not exist.</p>
        <Link href='/' className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all text-sm'>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
