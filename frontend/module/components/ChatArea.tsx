"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Message } from "./ChatPage";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSocket } from "../hooks/sockets";

type ChatPageProps = {
  loading: boolean;
  currentRoom: string | null;
  chatArr: Message[];
  sendMessage: (msq: string) => void;
  typingUsers: string[];
  socketEmitTyping: (
    currentRoom: string,
    username: string,
    istyping: boolean
  ) => void;
  username: string;
};

export default function ChatArea({
  loading,
  currentRoom,
  chatArr,
  sendMessage,
  typingUsers,
  socketEmitTyping,
  username,
}: ChatPageProps) {
  const [message, setmessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessage(message);
    setmessage(""); // clear input
  };

  let typingTimeout: NodeJS.Timeout;

  const handleTyping = (value: string) => {
    setmessage(value);


    if (!currentRoom) return;

    console.log("handletyping called.")

    socketEmitTyping(currentRoom, username, true);

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      socketEmitTyping(currentRoom, username, false);
    }, 1000);
  };

  const formatTypingUsers = (users: string[]) => {
    if (users.length === 0) return "";

    const displayUsers = users.slice(0, 3);
    let text = displayUsers.join(", ");

    if (users.length > 3) {
      text += ", ...";
    }

    return `${text} ${users.length === 1 ? "is" : "are"} typing...`;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden ">
      {/* Header */}
      <div className="border-b border-zinc-800 p-4">
        {loading ? (
          <Skeleton className="h-5 w-40" />
        ) : (
          <>
            <span># General</span>
            <span> in {currentRoom}</span>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4  space-y-3 overflow-y-auto">
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
          : chatArr.map((arrval, index) => {
              return (
                <div className="flex gap-3" key={arrval._id.toString()}>
                  <div className="h-10 w-10 bg-indigo-500 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{arrval.username}</p>
                    <p className="text-sm text-zinc-300">{arrval.message}</p>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 p-4">
        {loading ? (
          <Skeleton className="h-10 w-full rounded-xl" />
        ) : (
          <>
            <span>
              {typingUsers.length > 0 && (
                <p className="text-sm text-zinc-400 italic">
                  {formatTypingUsers(typingUsers)}
                </p>
              )}
            </span>
            <div className={"flex"}>
              <input
                type="text"
                value={message}
                placeholder="Type a message..."
                className="w-full rounded-xl bg-zinc-800 px-4 py-2 outline-none"
                onChange={(e) => {
                  handleTyping(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <Button onClick={handleSend}> Send</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
