import React from "react";
import RequestBodyDropDown from "./RequestBodyDropDown";
import JsonData from "./BodyComponents/JsonData";
import FormData from "./BodyComponents/FormData";
import UrlEncodedData from "./BodyComponents/url_encodedBody";
import BinaryData from "./BodyComponents/BinaryData";
import RequestHeaders from "./BodyComponents/RequestHeaders";
import { useTabsStore } from "@/store/TabManagementStore";

function RequestBody() {
  const { tabs, activeTabId, updateActiveTab } = useTabsStore();
  const tabData = tabs.find(tab => tab.id === activeTabId);

  if (!tabData) return null;

  const { headersVisible, bodyType } = tabData;

  const toggleHeaders = () => {
    updateActiveTab({
      headersVisible: !headersVisible,
      ...(headersVisible
        ? { headerFields: [{ id: crypto.randomUUID(), key: "", value: "", description: "" }] }
        : {}),
    });
  };

  return (
    <div className="flex flex-col space-y-3 mt-4">
      {/* Top Row - Request Type + Headers Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
          <RequestBodyDropDown />
        </div>

        <button
          onClick={toggleHeaders}
          className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 px-3 py-1 rounded w-fit"
        >
          {headersVisible ? "Hide Headers" : "Show Headers"}
        </button>
      </div>

      {/* Headers */}
      {headersVisible && <RequestHeaders />}

      {/* Info */}
      <small className="text-xs text-gray-500 dark:text-gray-400">
        Body will be sent as <span className="font-medium">{bodyType}</span>.
        Make sure the format is valid.
      </small>

      {/* Body Type Views */}
      {bodyType === "none" && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No body will be sent with the request.
        </p>
      )}

      {bodyType === "json" && <JsonData />}
      {bodyType === "form-data" && <FormData />}
      {bodyType === "x-www-form-urlencoded" && <UrlEncodedData />}
      {bodyType === "binary" && <BinaryData />}
    </div>
  );
}

export default RequestBody;
