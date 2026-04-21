import { Skeleton } from "@/components/ui/skeleton";


type ChatPageProps = {
  loading: boolean;
  chatArr: string[];
};


export default function ChatArea({ loading ,chatArr}:ChatPageProps) {
    return (
      <div className="flex flex-col">
        
        {/* Header */}
        <div className="border-b border-zinc-800 p-4">
          {loading ? (
            <Skeleton className="h-5 w-40" />
          ) : (
            <span># General</span>
          )}
        </div>
  
        {/* Messages */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-[70%]" />
                  </div>
                </div>
              ))
            : (
              chatArr.map((arrval,index)=>{
                return (
                  <div className="flex gap-3">
                  <div className="h-10 w-10 bg-indigo-500 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-sm text-zinc-300">{arrval}</p>
                  </div>
                </div>
                )
              })
             
            )}
        </div>
  
        {/* Input */}
        <div className="border-t border-zinc-800 p-4">
          {loading ? (
            <Skeleton className="h-10 w-full rounded-xl" />
          ) : (
            <input
              placeholder="Type a message..."
              className="w-full rounded-xl bg-zinc-800 px-4 py-2 outline-none"
            />
          )}
        </div>
      </div>
    );
  }