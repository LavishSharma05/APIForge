"use client";
import React from "react";
useTabsStore
import useHistoryStore from "@/store/useHistory";
import deleteAllHistoryFromDB from "@/util/api/deleteHistoryFromDb";
import { useTabsStore } from "@/store/TabManagementStore";

type HistoryField = {
  id: number;
  method: string;
  url: string;
  headers: Record<string, string>;
  bodyType: "json" | "form-data" | "x-www-form-urlencoded" | "binary" | "none" | null;
  requestBody:
    | string
    | Record<string, string>
    | null
    | Record<string, { value: string; type: "text" | "file" }>;
  timestamp: string;
};

function HistorySidebar() {
  const history = useHistoryStore((state) => state.history);
  const clearHistory = useHistoryStore((state) => state.clearHistory);

  const {
    tabs,
    activeTabId,
    updateActiveTab,
    setActiveTab
  } = useTabsStore();

  const handleClear = () => {
    if (history.length !== 0 && confirm("Are you sure you want to clear the history?")) {
      clearHistory(); // delete from zustand state
      deleteAllHistoryFromDB(); // delete from DB
    }
  };

  const handleHistory = (item: HistoryField) => {
    if (!activeTabId) return;

    // Update basic tab fields
    updateActiveTab({
      url: item.url,
      method: item.method,
      bodyType: item.bodyType || "none",
      requestBody:
        item.bodyType === "json" ? item.requestBody as string : "",
      responseStatus: "",
      responseBody: "",
      error: "",
    });

    // Update headers
    const headerArray = Object.entries(item.headers).map(([key, value]) => ({
      id: crypto.randomUUID(),
      key,
      value,
      description: "",
    }));
    updateActiveTab({ headerFields: headerArray });

    // Update body fields
    if (item.method !== "GET" && item.bodyType) {
      if (item.bodyType === "x-www-form-urlencoded") {
        const urlEncodedFields = Object.entries(item.requestBody || {}).map(([key, value]) => ({
          id: crypto.randomUUID(),
          key,
          value: value as string,
          description: "",
        }));
        updateActiveTab({ urlEncodedFields });
      } else if (item.bodyType === "form-data") {
        const formFields = Object.entries(item.requestBody || {}).map(
          ([key, data]: [string, { value: string; type: "text" | "file" }]) => ({
            id: crypto.randomUUID(),
            key,
            value: data.value,
            type: data.type,
            description: "",
          })
        );
        updateActiveTab({ formFields });
      }
    }
  };

  return (
    <div className="w-64 h-full overflow-y-auto bg-gray-800 border-r border-gray-700 p-4">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold text-gray-100">History</h2>
    <button
      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
      onClick={handleClear}
    >
      Clear
    </button>
  </div>

  {history.length === 0 ? (
    <p className="text-gray-400 text-sm">No history yet</p>
  ) : (
    <ul className="space-y-2">
      {history.map((item: HistoryField) => (
        <li
          key={item.id}
          className="p-2 bg-gray-700 rounded shadow hover:bg-gray-600 transition cursor-pointer"
          onClick={() => handleHistory(item)}
        >
          <p className="font-medium truncate text-gray-100">
            <span className="uppercase text-blue-400">{item.method}</span> -{" "}
            <span className="break-all">{item.url}</span>
          </p>
          <p className="text-xs text-gray-300">{item.bodyType || ""}</p>
          <p className="text-xs text-gray-400">
            {new Date(item.timestamp).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  )}
</div>

  );
}

export default HistorySidebar;
