"use client";

import { useEffect, useRef } from "react";

export function useSocket(onMessage: (data: any) => void) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3000");

    socketRef.current.onopen = () => {
      console.log("Socket connected");
    };

    socketRef.current.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      console.log("parsed",parsed)
      onMessage(parsed); // 🔥 delegate handling
    };

    socketRef.current.onclose = () => {
      console.log("Socket disconnected");
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  // 📤 send any event
  const send = (payload: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    } else {
      console.log("Socket not ready");
    }
  };

  // 👇 helper functions (clean API)
  const joinRoom = (roomId: string, username: string) => {
    send({
      type: "join-room",
      data: { roomId, username },
    });
  };

  const sendMessage = (_id:string,message: string, roomId: string, username: string) => {
    send({
      type: "message",
      data: {_id, message, roomId, username },
    });
  };

  return {
    joinRoom,
    sendMessage,
  };
}