import { Skeleton } from "@/components/ui/skeleton";

export default function ChannelPanel({ loading }: { loading: boolean }) {
    return (
      <div className="border-r border-zinc-800 p-4 space-y-3">
        {loading ? (
          <>
            <Skeleton className="h-6 w-32" />
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </>
        ) : (
          <>
            <h2 className="font-semibold">OG Esport</h2>
            <p className="text-sm text-zinc-400"># general</p>
          </>
        )}
      </div>
    );
  }