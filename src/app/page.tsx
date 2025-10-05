'use client';
import FrontForm  from "@/components/FrontForm";
import HistorySidebar from "@/components/BodyComponents/HistorySidebar";
import Header from "@/components/Header/header";
import fetchHistory from "@/util/api/fetchHistoryFromDB";
import { useEffect, useState } from "react";
import { useTabsStore } from "@/store/TabManagementStore"; // Import the tabs store
import { TabsBar } from "@/components/TabComponents/tabComp"; // Import the TabsBar component

export default function Home() {
  const [showHistory, setShowHistory] = useState(false);
  const { tabs, activeTabId } = useTabsStore(); // Get tab state
  const activeTab = tabs.find(tab => tab.id === activeTabId); // Find the active tab

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchHistory();
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      {/* Toggle History Button - Visible only on small screens */}
      <div className="md:hidden p-2 bg-gray-800 border-b border-gray-700">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowHistory(true)}
        >
          📜 View History
        </button>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        {/* History Sidebar */}
        <div
          className={`
            fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
            ${showHistory ? "translate-x-0" : "-translate-x-full"} 
            md:relative md:translate-x-0 md:block md:w-1/4 lg:w-1/5 border-r border-gray-700
          `}
        >
          <div className="md:hidden p-2 border-b border-gray-700 flex justify-end">
            <button
              className="text-sm text-gray-400 underline"
              onClick={() => setShowHistory(false)}
            >
              Close
            </button>
          </div>
          <HistorySidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Tab Bar */}
          <TabsBar />

          {/* Active Tab Content */}
          <div className="flex-1 p-4 sm:p-6">
            {activeTab ? (
              <FrontForm key={activeTab.id} tabData={activeTab} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Create a new tab to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}