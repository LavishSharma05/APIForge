import React from "react";
import { useTabsStore } from "@/store/TabManagementStore";

function ResponseViewer() {
  const { tabs, activeTabId } = useTabsStore();
  const tabData = tabs.find((tab) => tab.id === activeTabId);

  if (!tabData) return null;

  const { responseStatus, responseBody } = tabData;

  return (
    <div className="border rounded bg-gray-800 p-4 mt-6 w-full max-h-64 overflow-auto">
  <div
    className={`font-semibold mb-2 ${
      responseStatus.startsWith("2") ? "text-green-400" : "text-red-400"
    }`}
  >
    {responseStatus}
  </div>
  <div className="font-mono text-sm whitespace-pre-wrap break-words text-gray-200">
    {responseBody}
  </div>
</div>

  );
}

export default ResponseViewer;
