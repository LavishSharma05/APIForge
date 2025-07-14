'use client'
import FrontForm from "@/components/FrontForm";
import HistorySidebar from "@/components/BodyComponents/HistorySidebar";
import Header from "@/components/Header/header";
import { useEffect } from "react";
import fetchHistory from "@/util/api/fetchHistoryFromDB";

export default function Home() {
  useEffect(()=>{
    if(localStorage.getItem("token")){
      console.log("hello")
      fetchHistory()
    }
  },[])
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <HistorySidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <FrontForm />
        </div>
      </div>
    </div>
  );
}
