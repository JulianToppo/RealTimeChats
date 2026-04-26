"use client"
import Sidebar from "@/module/components/Sidebar";
import Channel from "@/module/components/Channel";
import ChatArea from "@/module/components/ChatArea";
import RightInfoPanel from "@/module/components/RightInfoPanel";
import { useEffect, useState } from "react";
import {Types } from "mongoose";
import { useSocket } from "../hooks/sockets";

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

export type Message= {
  _id:Types.ObjectId,
  message:String,
  roomId:Number,
  username:String
  
}

type User = {
  user: {
    _id: Types.ObjectId;
    username: string;
  };
};


export default function ChatPage({user}:User) {

  if(!user){
    return null;
  }

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);


  const { joinRoom, sendMessage:socketSendMessage } = useSocket((data) => {

  

    if (data.type === "message") {
      
      setMessages((prev) => [...prev, data.data]);
    }
  
    if (data.type === "typing") {
      setIsTyping(data.data?.isTyping);
    }

    if (data.type === "new-group") {
      console.log("New group received:", data.data);
  
      setRooms((prev) => [...prev, data.data]);
    }
  
  });

  const userId = "user-1";  // Will fix it using a dynamic value later on
  useEffect(() => {
    console.log(user)
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

  useEffect(() => {
    if (!currentRoom) return;
  
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/messages/${currentRoom}`
        );
  
        if (!res.ok) throw new Error("Failed to fetch messages");
  
        const data = await res.json();
          
        console.log("returned",data ,currentRoom,user.username);
        setMessages(data);
        
        joinRoom(currentRoom, user.username);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchMessages();
  }, [currentRoom]);

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
  

  const sendMessage = async (text: string) => {
    if (!currentRoom || !text.trim()) return;
  
    console.log("send message called")
    const res = await fetch("http://localhost:3000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
        roomId: currentRoom,
        username: user.username,
      }),
    });
  
    const newMsg = await res.json();
    console.log("new message entered in the db ")
    socketSendMessage(newMsg.data._id,text, currentRoom, user.username);
    
  
    // update UI instantly
    // setMessages((prev) => [...prev, newMsg.data]);
  };


 

  // const handleSendMessage = (text: string) => {
  //   if (!text.trim() || !currentRoom) return;
   
  // };
  


    return (
      <div className="h-screen bg-zinc-950 p-4 text-white">
        <div className="grid h-full grid-cols-[72px_100px_1fr_100px] rounded-3xl border border-zinc-800 overflow-hidden">
  
          {/* Sidebar */}
          <Sidebar loading={loading} rooms={rooms}
          handleCreateGroup={handleCreateGroup}
        currentRoom={currentRoom}
        joinRoom={joinRoom}
        setCurrentRoom={setCurrentRoom}
        username={user.username}/>
  
          {/* Channels */}
          <Channel loading={loading} />
  
          {/* Chat */}
          <ChatArea loading={loading}   currentRoom={currentRoom} chatArr={messages} sendMessage={sendMessage} />
  
          {/* Info */}
          <RightInfoPanel loading={loading} />
  
        </div>
      </div>
    );
  }