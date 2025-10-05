"use client";
import React from "react";
import { useTabsStore } from "@/store/TabManagementStore";

function JsonData() {
  const activeTab = useTabsStore((state) =>
    state.tabs.find((t) => t.id === state.activeTabId)
  );
  const updateActiveTab = useTabsStore((state) => state.updateActiveTab);

  return (
    <div>
      <textarea
        id="request-body"
        className="w-full p-3 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 text-sm font-mono min-h-[150px]"
        rows={6}
        value={activeTab?.requestBody || ""}
        onChange={(e) => updateActiveTab({ requestBody: e.target.value })}
        placeholder='Enter JSON body like { "name": "John" }'
      />
    </div>
  );
}

export default JsonData;
