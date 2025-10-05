"use client";
import React from "react";
import { useTabsStore } from "@/store/TabManagementStore";

type UrlFormField = {
  id: string;
  key: string;
  value: string;
  description: string;
};

function UrlEncodedData() {
  const activeTab = useTabsStore((state) =>
    state.tabs.find((t) => t.id === state.activeTabId)
  );
  const updateActiveTab = useTabsStore((state) => state.updateActiveTab);
  const addUrlEncodedField = useTabsStore((state) => state.addUrlEncodedField);
  const removeUrlEncodedField = useTabsStore(
    (state) => state.removeUrlEncodedField
  );

  if (!activeTab) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">x-www-form-urlencoded</h2>
      {activeTab.urlEncodedFields.map((field: UrlFormField) => (
        <div key={field.id} className="mb-4 flex items-start gap-2">
          {/* Key Input */}
          <input
            type="text"
            value={field.key}
            onChange={(e) =>
              updateActiveTab({
                urlEncodedFields: activeTab.urlEncodedFields.map((f) =>
                  f.id === field.id ? { ...f, key: e.target.value } : f
                ),
              })
            }
            placeholder="Key"
            className="border p-2 rounded w-[150px]"
          />

          {/* Value Input */}
          <input
            type="text"
            value={field.value}
            onChange={(e) =>
              updateActiveTab({
                urlEncodedFields: activeTab.urlEncodedFields.map((f) =>
                  f.id === field.id ? { ...f, value: e.target.value } : f
                ),
              })
            }
            placeholder="Value"
            className="border p-2 rounded w-[200px]"
          />

          {/* Description */}
          <input
            type="text"
            value={field.description}
            onChange={(e) =>
              updateActiveTab({
                urlEncodedFields: activeTab.urlEncodedFields.map((f) =>
                  f.id === field.id ? { ...f, description: e.target.value } : f
                ),
              })
            }
            placeholder="Description"
            className="border p-2 rounded w-[200px]"
          />

          {/* Remove Button */}
          <button
            onClick={() => removeUrlEncodedField(field.id)}
            className="text-red-500 font-bold"
          >
            🗑
          </button>
        </div>
      ))}

      <button
        onClick={addUrlEncodedField}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        ➕ Add Row
      </button>
    </div>
  );
}

export default UrlEncodedData;
