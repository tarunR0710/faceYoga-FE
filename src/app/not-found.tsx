import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[64px] font-medium text-[#eee] mb-2">404</p>
        <h1 className="text-[1.75rem] font-medium text-[#111] mb-4">Page not found</h1>
        <p className="text-[15px] text-[#666] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="h-11 px-6 bg-[#111] text-white text-[14px] font-medium rounded-full hover:bg-[#222] transition-colors inline-flex items-center"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
