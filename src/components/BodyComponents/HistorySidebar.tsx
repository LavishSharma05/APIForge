"use client";
import React, { useEffect } from "react";
import useHistoryStore from "@/store/useHistory";
import useRequestStore from "@/store/requestStore";
import fetchHistory from "@/util/api/fetchHistoryFromDB";
import deleteAllHistoryFromDB from "@/util/api/deleteHistoryFromDb";

type HistoryField = {
  id: number;
  method: string;
  url: string;
  headers: Record<string, string>;
  bodyType: string | null;
  requestBody:
    | string
    | Record<string, string>
    | null
    | Record<string, { value: string; type: "text" | "file" }>;
  timestamp: string;
  formFieldType: string | null;
};

function HistorySidebar() {
  const history = useHistoryStore((state) => state.history);
  const clearHistory = useHistoryStore((state) => state.clearHistory);
  const { setField } = useRequestStore();

  const handleClear = () => {
    if (
      history.length !== 0 &&
      confirm("Are you sure you want to clear the history?")
    ) {
      clearHistory();// Delete history from zustand state
      deleteAllHistoryFromDB()// delete history from DB
    }
  };

  const handleHistory = (item: HistoryField) => {
    setField("url", item.url);
    setField("method", item.method);
    setField("bodyType", item.bodyType);

    if (item.method !== "GET" || item.bodyType !== "DELETE") {
      if (item.bodyType === "x-www-form-urlencoded") {
        const formArray = Object.entries(item.requestBody || {}).map(
          ([key, value]) => ({
            key,
            value,
          })
        );
        console.log(formArray);
        setField("urlEncodedFields", formArray);
      } else if (item.bodyType === "form-data") {
        const formArray = Object.entries(item.requestBody || {}).map(
          ([key, data]: [
            string,
            { value: string; type: "text" | "file" }
          ]) => ({
            key,
            value: data.value,
            type: data.type,
          })
        );

        console.log("Restored formData from history:", formArray);

        setField("formFields", formArray);
      } else {
        setField("requestBody", item.requestBody);
      }
    }

    const headerArray = Object.entries(item.headers).map(([key, value]) => ({
      key,
      value,
    }));

    setField("headerFields", headerArray);
  };

  return (
    <div className="w-64 h-full overflow-y-auto bg-gray-100 border-r border-gray-300 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">History</h2>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 text-sm">No history yet</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item: HistoryField) => (
            <li
              key={item.id}
              className="p-2 bg-white rounded shadow hover:bg-gray-50 transition cursor-pointer"
              onClick={() => handleHistory(item)}
            >
              <p className="font-medium truncate">
                <span className="uppercase text-blue-600">{item.method}</span> -{" "}
                <span className="break-all">{item.url}</span>
              </p>
              <p className="text-xs text-gray-500">
                {item.method !== "GET" ? item.bodyType : ""}
              </p>
              <p className="text-xs text-gray-500">
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
