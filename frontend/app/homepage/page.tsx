"use client";

import ChatPage from "@/module/components/ChatPage";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [loading, setloading] = useState(true);
  const [chatArr, setChatArr] = useState<string[]>([]);
 
  useEffect(() => {
    setTimeout(() => {
      setChatArr(["Hey", "Hey how are you"]);
      setloading(false);
    }, 1000);
  }, []);

  return (
    <>
      <ChatPage loading={loading} chatArr={chatArr} />
    </>
  );
}
