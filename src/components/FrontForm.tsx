"use client";
import React from "react";
import RequestMethodSelector from "./RequestMethodSelector";
//import useRequestStore from "@/store/requestStore";
import RequestBody from "./RequestBody";
import LoadingWheel from "./LoadingWheel";
import ResponseViewer from "./ResponseViewer";
import { sendGetRequest } from "@/util/api/sendGetRequest";
import { sendDeleteRequest } from "@/util/api/sendDeleteRequest";
import { sendJsonRequest } from "@/util/api/sendJsonRequest";
import { handleResponse } from "@/util/api/handleResponse";
import { sendFormDataRequest } from "@/util/api/sendFormDataRequest";
import { validateFormFields } from "@/util/api/validateFormFields";
import { sendUrlEncodedRequest } from "@/util/api/sendUrlEncodedRequest";
import { validateUrlEncodedFields } from "@/util/api/validateUrlEncodedFields";
import { sendBinaryRequest } from "@/util/api/sendBinaryRequest";
import { buildHeadersFromFields } from "@/util/api/buildHeaderFormFields";
import useHistoryStore from "@/store/useHistory";
import buildHistory from "@/util/RequestHistory/buildHistory";
import logHistory from "@/util/api/logHistory"
import { Tab,useTabsStore } from "@/store/TabManagementStore";


type FormField = {
  id: string;
  key: string;
  value: string | File;
  type: "text" | "file";
  description: string;
};

type UrlEncodedField = {
  id: string;
  key: string;
  value: string;
  description: string;
};



function FrontForm({ tabData }: { tabData: Tab }) {
  const {
    method,
    url,
    isLoading,
    error,
    requestBody,
    bodyType,
    formFields,
    urlEncodedFields,
    binaryBody,
    headerFields,
  } = tabData;

  const { updateActiveTab } = useTabsStore();
  
  const{ 
    addHistory,
  }=useHistoryStore.getState()

  const handleSend = async () => {
    
    if (!url) {
      updateActiveTab({error: "Please enter a valid URL"});
      return;
    }

    try {
      const parsedURL = new URL(url);
      if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
        updateActiveTab({ error: "Please enter a valid URL with http:// or https://" });
        return;
      }
      updateActiveTab({error: ""}); // Clear any previous error
    } catch (err) {
      console.error(err)
      updateActiveTab({error: "Please enter a valid URL"});
      return;
    }

    updateActiveTab({ responseStatus: "", responseBody: "", error: "", isLoading: true });

    try {
      if (method === "GET") {
        const headers = buildHeadersFromFields(headerFields);
        const response = await sendGetRequest(url, headers);

        

        const { statusCode, statusText, body } = await handleResponse(response);
        updateActiveTab({responseStatus: `${statusCode} ${statusText}`});
        updateActiveTab({responseBody: body});

        if (statusCode >= 400) {
          updateActiveTab({error: `Error ${statusCode}: ${statusText}`});
        }

        addHistory(buildHistory())
        logHistory()
        return;
      } else if (method === "DELETE") {
        const headers = buildHeadersFromFields(headerFields);
        const response = await sendDeleteRequest(url,headers);

        const { statusCode, statusText, body } = await handleResponse(response);
        updateActiveTab({responseStatus: `${statusCode} ${statusText}`});
        updateActiveTab({responseBody: body});

        if (statusCode >= 400) {
          updateActiveTab({error: `Error ${statusCode}: ${statusText}`});
        }

        addHistory(buildHistory())
        logHistory()
        return;
      }

      if (bodyType === "json") {
        if (method === "POST" || method === "PUT") {
          if (!requestBody || requestBody.trim() === "") {
            updateActiveTab({error: "Please enter a valid request body"});
            updateActiveTab({isLoading: false});
            return;
          }

          const headers = buildHeadersFromFields(headerFields);

          try {
            const response = await sendJsonRequest(url, method, requestBody,headers);
            const { statusCode, statusText, body } = await handleResponse(
              response
            );
            updateActiveTab({responseStatus: `${statusCode} ${statusText}`});
            updateActiveTab({responseBody: body});
            
            if (statusCode >= 400) {
              updateActiveTab({error: `Error ${statusCode}: ${statusText}`});
            }

            addHistory(buildHistory())
            logHistory()
          } catch (err) {
            updateActiveTab(
              {error:
              (err as Error).message ||
                "An error occurred while sending form-data."
          });
          }
        }
      } else if (bodyType === "form-data") {
        if (method === "PUT" || method === "POST") {
          const filledFields = formFields.filter(
            (field: FormField) => field.key.trim() !== ""
          );

          const validationError = validateFormFields(filledFields);
          if (validationError) {
            updateActiveTab({error: validationError});
            updateActiveTab({isLoading: false});
            return;
          }

          const headers=buildHeadersFromFields(headerFields)

          try {
            const response = await sendFormDataRequest(
              url,
              method,
              filledFields,
              headers
            );
            const { statusCode, statusText, body } = await handleResponse(
              response
            );
            updateActiveTab({responseStatus: `${statusCode} ${statusText}`});
            updateActiveTab({responseBody: body});
            if (statusCode >= 400) {
              updateActiveTab({error: `Error ${statusCode}: ${statusText}`});
            }
            addHistory(buildHistory())
            logHistory()

          } catch (err) {
            updateActiveTab({error: (err as Error).message});
          } finally {
            updateActiveTab({isLoading: false});
          }
        }
      } else if (bodyType === "x-www-form-urlencoded") {
        const filledFields = urlEncodedFields.filter(
          (field: UrlEncodedField) => field.key.trim() !== ""
        );

        const validationError = validateUrlEncodedFields(filledFields);
        if (validationError) {
          updateActiveTab({error: validationError});
          updateActiveTab({isLoading: false});
          return;
        }

        const headers=buildHeadersFromFields(headerFields)


        try {
          const response = await sendUrlEncodedRequest(
            url,
            method,
            filledFields,
            headers,
          );
          const { statusCode, statusText, body } = await handleResponse(
            response
          );
          updateActiveTab({responseStatus: `${statusCode} ${statusText}`});
        updateActiveTab({responseBody: body});
          if (statusCode >= 400) {
            updateActiveTab({error: `Error ${statusCode}: ${statusText}`});
          }
          addHistory(buildHistory())
          logHistory()
        } catch (err) {
          updateActiveTab(
            {error:
            (err as Error).message ||
              "An error occurred while sending urlencoded data."
          });
        } finally {
          updateActiveTab({isLoading: false});
        }
      } else if (bodyType === "binary") {
        if (method === "POST" || method === "PUT") {
          if (!binaryBody) {
            updateActiveTab({error: "Please select a binary file to upload."});
            updateActiveTab({isLoading: false});
            return;
          }

          const headers = buildHeadersFromFields(headerFields);

          try {
            const response = await sendBinaryRequest(url, method, binaryBody, headers);
            const { statusCode, statusText, body } = await handleResponse(
              response
            );
            updateActiveTab({responseStatus: `${statusCode} ${statusText}`});
        updateActiveTab({responseBody: body});

            if (statusCode >= 400) {
              updateActiveTab({error: `Error ${statusCode}: ${statusText}`});
            }

            addHistory(buildHistory())
            logHistory()
          } catch (err) {
            updateActiveTab({error: (err as Error).message});
          } finally {
            updateActiveTab({isLoading: false});
          }
        }
      }

      updateActiveTab({error: ""}); // Clear any error after success
    } catch (err) {
      console.error(err)
      updateActiveTab({error: "An error occurred while sending the request."});
    } finally {
      updateActiveTab({isLoading: false});
    }
  };

  const handleClear = () => {
    updateActiveTab({method: "GET"});
    updateActiveTab({url: ""});
    updateActiveTab({responseStatus: ""});
    updateActiveTab({responseBody: ""});
    updateActiveTab({error: ""});
    updateActiveTab({isLoading: false});
    updateActiveTab({binaryBody: null});
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center py-10 px-4">
  <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-5xl overflow-auto">
    <RequestMethodSelector />

    {/* Request Body Input */}
    <RequestBody />

    <div className="flex gap-4 mt-4">
      <button
        className={`px-4 py-2 rounded text-white ${
          isLoading
            ? 'bg-blue-300 dark:bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
        }`}
        onClick={handleSend}
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
      <button
        className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        onClick={handleClear}
      >
        Clear
      </button>
    </div>

    {isLoading ? (
      <LoadingWheel />
    ) : error ? (
      <div className="mt-4 text-red-600 dark:text-red-400 font-medium">{error}</div>
    ) : (
      <ResponseViewer />
    )}
  </div>
</div>

  );
}

export default FrontForm;
