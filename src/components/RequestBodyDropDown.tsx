import React from "react";
import { useTabsStore } from "@/store/TabManagementStore";

function RequestBodyDropDown() {
  const { tabs, activeTabId, updateActiveTab } = useTabsStore();
  const tabData = tabs.find((tab) => tab.id === activeTabId);

  if (!tabData) return null;

  const { bodyType } = tabData;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as typeof tabData.bodyType;
    updateActiveTab({ bodyType: value });
  };

  return (
    <div className="mt-4 w-full">
      <label
        htmlFor="bodyType"
        className="block mb-1 text-sm font-medium text-gray-800"
      >
        Body Type
      </label>
      <select
        id="bodyType"
        value={bodyType}
        onChange={handleChange}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm 
                   bg-white text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                   transition"
      >
        <option value="none">None</option>
        <option value="json">JSON</option>
        <option value="form-data">Form Data</option>
        <option value="x-www-form-urlencoded">x-www-form-urlencoded</option>
        <option value="binary">Binary</option>
      </select>
    </div>
  );
}

export default RequestBodyDropDown;
