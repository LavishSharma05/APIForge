"use client";
import React from "react";
import { useTabsStore } from "@/store/TabManagementStore";

function RequestMethodSelector() {
  const activeTab = useTabsStore((state) =>
    state.tabs.find((t) => t.id === state.activeTabId)
  );
  const setField = useTabsStore((state) => state.updateActiveTab);

  if (!activeTab) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      {/* Method Dropdown */}
      <select
        id="method"
        name="method"
        className="w-full sm:w-32 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm 
               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={activeTab.method}
        onChange={(e) => setField({ method: e.target.value })}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>

      {/* URL Input */}
      <input
        type="text"
        placeholder="https://example.com/api/blog"
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm
               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={activeTab.url}
        onChange={(e) => setField({ url: e.target.value })}
      />
    </div>
  );
}

export default RequestMethodSelector;
