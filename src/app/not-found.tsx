import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <p className="mb-4">Page not found</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
