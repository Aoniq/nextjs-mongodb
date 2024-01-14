import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full h-full bg-black text-white">
      <div className="h-full w-full container mx-auto px-4">
        <div className='flex lg:flex-row lg:ml-6 text-lg font-light'>
          <Link href="/" className="hover:text-jungle-green-500 duration-200 py-4">
            <p className="inline-block mr-6">Home</p>
          </Link>
          <Link href="/login" className="hover:text-jungle-green-500 duration-200 py-4">
            <p className="inline-block">Login</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
