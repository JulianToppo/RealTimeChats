"use client"
import ChatPage from "@/module/components/ChatPage";
import { useRouter, } from "next/navigation";
import {useEffect, useState} from "react";



export default function Homepage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.push("/login"); // redirect
    } else {
      setUser(JSON.parse(savedUser));
      console.log(user)
    }
  }, []);

  if (!user) return null;
  return (
    <>
      <ChatPage  user={user}/>
    </>
  );
}
