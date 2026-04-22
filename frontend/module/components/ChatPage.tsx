"use client"
import Sidebar from "@/module/components/Sidebar";
import Channel from "@/module/components/Channel";
import ChatArea from "@/module/components/ChatArea";
import RightInfoPanel from "@/module/components/RightInfoPanel";
import { useEffect, useState } from "react";

type ChatPageProps = {
  loading: boolean;
  chatArr: string[];
};

type Group={
  name:string,
  groupPhotoLink:string
};

type Room = {
  id: string;
  name: string;
  admins: string[];
};

export default function ChatPage() {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  const userId = "user-1";  // Will fix it using a dynamic value later on
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch(
        `http://localhost:3000/groups?userId=${userId}`
      );
  
      const data = await res.json();
  
      setRooms(data);
      setLoading(false);
    };
  
    fetchGroups();
  }, []);

  const handleCreateGroup = async (name:string) => {
    
    if (!name) return;
  
    const res = await fetch("http://localhost:3000/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,    
        admins: ["user-1"],
      }),
    });
  
    const newGroup = await res.json();
  
    setRooms((prev) => [...prev, newGroup]);
    setCurrentRoom(newGroup.id);
  };
  
    return (
      <div className="h-screen bg-zinc-950 p-4 text-white">
        <div className="grid h-full grid-cols-[72px_260px_1fr_300px] rounded-3xl border border-zinc-800 overflow-hidden">
  
          {/* Sidebar */}
          <Sidebar loading={loading} rooms={rooms}
          handleCreateGroup={handleCreateGroup}
        currentRoom={currentRoom}

        setCurrentRoom={setCurrentRoom}/>
  
          {/* Channels */}
          <Channel loading={loading} />
  
          {/* Chat */}
          <ChatArea loading={loading}  chatArr={[]}/>
  
          {/* Info */}
          <RightInfoPanel loading={loading} />
  
        </div>
      </div>
    );
  }