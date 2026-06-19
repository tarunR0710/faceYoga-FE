'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[12px] text-[#999] uppercase tracking-[0.1em] mb-3">Error</p>
        <h1 className="text-[2rem] font-medium text-[#111] mb-4">Something went wrong</h1>
        <p className="text-[15px] text-[#666] mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="h-11 px-6 bg-[#111] text-white text-[14px] font-medium rounded-full hover:bg-[#222] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="h-11 px-6 border border-[#ddd] text-[#666] text-[14px] font-medium rounded-full hover:bg-[#f5f5f5] transition-colors inline-flex items-center"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
