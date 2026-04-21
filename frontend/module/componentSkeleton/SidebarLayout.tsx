import { Skeleton } from "@/components/ui/skeleton";

function Sidebar({ loading }: { loading: boolean }) {
  return (
    <div className="border-r border-zinc-800 p-3 flex flex-col items-center gap-4">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-12 rounded-2xl" />
          ))
        : [1,2,3].map((i) => (
            <div key={i} className="h-12 w-12 rounded-2xl bg-indigo-500" />
          ))}
    </div>
  );
}