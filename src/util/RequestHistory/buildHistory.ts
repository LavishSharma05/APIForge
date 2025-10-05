import { useTabsStore } from "@/store/TabManagementStore";

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
};

const buildHistory = (): HistoryField => {
  const {
    method,
    url,
    bodyType,
    requestBody,
    formFields,
    urlEncodedFields,
    headerFields,
  } = useTabsStore.getState().tabs.find(
    (t) => t.id === useTabsStore.getState().activeTabId
  )!; // active tab

  const headers: Record<string, string> = {};
  for (const { key, value } of headerFields) {
    if (key.trim() !== "") headers[key] = value;
  }

  let formattedRequestBody: HistoryField["requestBody"] = null;

  if (method !== "GET" && method !== "DELETE") {
    if (bodyType === "json") {
      formattedRequestBody = requestBody;
    } else if (bodyType === "form-data") {
      const formBody: Record<string, { value: string; type: "text" | "file" }> = {};
      for (const field of formFields) {
        if (field.key.trim() !== "") {
          if (field.type === "file" && field.value instanceof File) {
            formBody[field.key] = { value: field.value.name, type: field.type };
          } else if (field.type === "text" && typeof field.value === "string") {
            formBody[field.key] = { value: field.value, type: field.type };
          }
        }
      }
      formattedRequestBody = formBody;
    } else if (bodyType === "x-www-form-urlencoded") {
      const urlBody: Record<string, string> = {};
      for (const { key, value } of urlEncodedFields) {
        if (key.trim() !== "") urlBody[key] = value;
      }
      formattedRequestBody = urlBody;
    } else if (bodyType === "binary") {
      formattedRequestBody = null; // could store file name if needed
    }
  }

  const timestamp = Date.now();

  return {
    id: timestamp,
    method,
    url,
    bodyType,
    headers,
    requestBody: formattedRequestBody,
    timestamp: new Date(timestamp).toISOString(),
  };
};

export default buildHistory;
