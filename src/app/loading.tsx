export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Pulse ring loader */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-[#eee]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#111] animate-spin" />
        </div>
        <p className="text-[13px] text-[#999]">Loading...</p>
      </div>
    </div>
  )
}
