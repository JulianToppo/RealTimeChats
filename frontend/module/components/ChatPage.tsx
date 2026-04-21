import Sidebar from "@/module/components/Sidebar";
import Channel from "@/module/components/Channel";
import ChatArea from "@/module/components/ChatArea";
import RightInfoPanel from "@/module/components/RightInfoPanel";

type ChatPageProps = {
  loading: boolean;
  chatArr: string[];
};

export default function ChatPage({ loading, chatArr }: ChatPageProps) {
    return (
      <div className="h-screen bg-zinc-950 p-4 text-white">
        <div className="grid h-full grid-cols-[72px_260px_1fr_300px] rounded-3xl border border-zinc-800 overflow-hidden">
  
          {/* Sidebar */}
          <Sidebar loading={loading} />
  
          {/* Channels */}
          <Channel loading={loading} />
  
          {/* Chat */}
          <ChatArea loading={loading} chatArr={chatArr}/>
  
          {/* Info */}
          <RightInfoPanel loading={loading} />
  
        </div>
      </div>
    );
  }