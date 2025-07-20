'use client';
import FrontForm from "@/components/FrontForm";
import HistorySidebar from "@/components/BodyComponents/HistorySidebar";
import Header from "@/components/Header/header";
import fetchHistory from "@/util/api/fetchHistoryFromDB";
import { useEffect, useState } from "react";

export default function Home() {
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchHistory();
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header />

      {/* Toggle History Button - Visible only on small screens */}
      <div className="md:hidden p-2 bg-gray-200 border-b border-gray-300">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowHistory(true)}
        >
          📜 View History
        </button>
      </div>

      <div className="flex flex-1 relative">
        {/* History Sidebar */}
        <div
          className={`
            fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
            ${showHistory ? "translate-x-0" : "-translate-x-full"} 
            md:relative md:translate-x-0 md:block
          `}
        >
          <div className="md:hidden p-2 border-b">
            <button
              className="text-sm text-gray-600 underline"
              onClick={() => setShowHistory(false)}
            >
              Close
            </button>
          </div>
          <HistorySidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <FrontForm />
        </div>
      </div>
    </div>
  );
}
