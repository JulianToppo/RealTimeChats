"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Room = {
  id: string;
  name: string;
};

type SidebarProps = {
  loading:boolean,
  handleCreateGroup: (name:string) => void;
  rooms: Room[];
  currentRoom: string | null;
  setCurrentRoom: (id: string) => void;
};
export default function Sidebar({
  loading,
  handleCreateGroup,
  rooms,
  currentRoom,
  setCurrentRoom,
}: SidebarProps) {

  const [groupName, setGroupName] = useState("");
  const [open, setopen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName.trim()) return;

    handleCreateGroup(groupName); 
    setCurrentRoom(groupName)
    setGroupName(""); 
    setopen(false)
  };

 

  return (
    <div className="border-r border-zinc-800 p-3 flex flex-col items-center gap-4">
      
      <Popover open={open} onOpenChange={setopen}>
        <PopoverTrigger asChild>
          <Button>+</Button>
        </PopoverTrigger>

        {/* 📝 Popover Form */}
        <PopoverContent className="w-64">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <Button type="submit">Create Group</Button>
          </form>
        </PopoverContent>
      </Popover>
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-12 rounded-2xl" />
          ))
        : rooms.map((val,i) => (
            <div key={i} className="h-12 w-12 rounded-2xl bg-indigo-500" >
              <p>{val.name}</p>
            </div>
          ))}
    </div>
  );
}