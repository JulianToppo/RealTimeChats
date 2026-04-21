import { Skeleton } from "@/components/ui/skeleton";

export default function InfoPanel({ loading }: { loading: boolean }) {
    return (
      <div className="border-l border-zinc-800 p-4 space-y-4">
        {loading ? (
          <>
            <Skeleton className="h-20 w-20 rounded-full mx-auto" />
            <Skeleton className="h-5 w-32 mx-auto" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : (
          <>
            <div className="h-20 w-20 rounded-full bg-zinc-700 mx-auto" />
            <h3 className="text-center font-semibold">OG Esport</h3>
            <p className="text-sm text-zinc-400">
              Group description here...
            </p>
          </>
        )}
      </div>
    );
  }