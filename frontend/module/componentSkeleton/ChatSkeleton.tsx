import { Skeleton } from "@/components/ui/skeleton";

export default function ChatSkeleton() {
  return (
    <div className="h-screen p-4 bg-zinc-950">
      <div className="grid h-full grid-cols-[72px_240px_1fr_300px] gap-0 rounded-3xl overflow-hidden border border-zinc-800">

        {/* Sidebar */}
        <div className="flex flex-col items-center gap-4 p-3 border-r border-zinc-800">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-12 rounded-2xl" />
          ))}
        </div>

        {/* Channel Panel */}
        <div className="p-4 border-r border-zinc-800 space-y-4">
          <Skeleton className="h-6 w-32" />
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded-md" />
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800">
            <Skeleton className="h-5 w-40" />
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-[70%]" />
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-zinc-800">
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-4 border-l border-zinc-800 space-y-4">
          <Skeleton className="h-20 w-20 rounded-full mx-auto" />
          <Skeleton className="h-5 w-32 mx-auto" />
          <Skeleton className="h-4 w-full" />

          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-xl" />
          ))}
        </div>

      </div>
    </div>
  );
}