"use client";
import React from "react";
import RequestMethodSelector from "./RequestMethodSelector";
import useRequestStore from "@/store/requestStore";
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
import RequestHeaders from "./BodyComponents/RequestHeaders";
import { buildHeadersFromFields } from "@/util/api/buildHeaderFormFields";
import useHistoryStore from "@/store/useHistory";
import { timeStamp } from "console";
import buildHistory from "@/util/RequestHistory/buildHistory";
import logHistory from "@/util/api/logHistory"


type FormField = {
  id: number;
  key: string;
  value: string | File;
  type: "text" | "file";
  description: string;
};

type UrlEncodedField = {
  id: number;
  key: string;
  value: string;
  description: string;
};



function FrontForm() {
  const {
    method,
    url,
    responseStatus,
    responseBody,
    loading,
    error,
    requestBody,
    bodyType,
    setField,
    formFields,
    urlEncodedFields,
    binaryBody,
    headersVisible,
    headerFields,
  } = useRequestStore();

  const{
    addHistory,
    clearHistory,
    deleteHistory,
    history
  }=useHistoryStore.getState()

  const handleSend = async () => {
    if (!url) {
      setField("error", "Please enter a valid URL");
      return;
    }

    try {
      const parsedURL = new URL(url);
      if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
        setField("error", "Please enter a valid URL with http:// or https://");
        return;
      }
      setField("error", ""); // Clear any previous error
    } catch (err) {
      setField("error", "Please enter a valid URL");
      return;
    }

    setField("responseStatus", "");
    setField("responseBody", "");
    setField("error", ""); // Clear error before sending
    setField("loading", true);

    try {
      if (method === "GET") {
        const headers = buildHeadersFromFields(headerFields);
        const response = await sendGetRequest(url, headers);

        

        const { statusCode, statusText, body } = await handleResponse(response);
        setField("responseStatus", `${statusCode} ${statusText}`);
        setField("responseBody", body);

        if (statusCode >= 400) {
          setField("error", `Error ${statusCode}: ${statusText}`);
        }

        addHistory(buildHistory())
        logHistory()
        return;
      } else if (method === "DELETE") {
        const headers = buildHeadersFromFields(headerFields);
        const response = await sendDeleteRequest(url,headers);

        const { statusCode, statusText, body } = await handleResponse(response);
        setField("responseStatus", `${statusCode} ${statusText}`);
        setField("responseBody", body);

        if (statusCode >= 400) {
          setField("error", `Error ${statusCode}: ${statusText}`);
        }

        addHistory(buildHistory())
        logHistory()
        return;
      }

      if (bodyType === "json") {
        if (method === "POST" || method === "PUT") {
          if (!requestBody || requestBody.trim() === "") {
            setField("error", "Please enter a valid request body");
            setField("loading", false);
            return;
          }

          const headers = buildHeadersFromFields(headerFields);

          try {
            const response = await sendJsonRequest(url, method, requestBody,headers);
            const { statusCode, statusText, body } = await handleResponse(
              response
            );
            setField("responseStatus", `${statusCode} ${statusText}`);
            setField("responseBody", body);
            
            if (statusCode >= 400) {
              setField("error", `Error ${statusCode}: ${statusText}`);
            }

            addHistory(buildHistory())
            logHistory()
          } catch (err) {
            setField(
              "error",
              (err as Error).message ||
                "An error occurred while sending form-data."
            );
          }
        }
      } else if (bodyType === "form-data") {
        if (method === "PUT" || method === "POST") {
          const filledFields = formFields.filter(
            (field: FormField) => field.key.trim() !== ""
          );

          const validationError = validateFormFields(filledFields);
          if (validationError) {
            setField("error", validationError);
            setField("loading", false);
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
            setField("responseStatus", `${statusCode} ${statusText}`);
            setField("responseBody", body);
            if (statusCode >= 400) {
              setField("error", `Error ${statusCode}: ${statusText}`);
            }
            addHistory(buildHistory())
            logHistory()

          } catch (err) {
            setField("error", (err as Error).message);
          } finally {
            setField("loading", false);
          }
        }
      } else if (bodyType === "x-www-form-urlencoded") {
        const filledFields = urlEncodedFields.filter(
          (field: UrlEncodedField) => field.key.trim() !== ""
        );

        const validationError = validateUrlEncodedFields(filledFields);
        if (validationError) {
          setField("error", validationError);
          setField("loading", false);
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
          setField("responseStatus", `${statusCode} ${statusText}`);
          setField("responseBody", body);
          if (statusCode >= 400) {
            setField("error", `Error ${statusCode}: ${statusText}`);
          }
          addHistory(buildHistory())
          logHistory()
        } catch (err) {
          setField(
            "error",
            (err as Error).message ||
              "An error occurred while sending urlencoded data."
          );
        } finally {
          setField("loading", false);
        }
      } else if (bodyType === "binary") {
        if (method === "POST" || method === "PUT") {
          if (!binaryBody) {
            setField("error", "Please select a binary file to upload.");
            setField("loading", false);
            return;
          }

          const headers = buildHeadersFromFields(headerFields);

          try {
            const response = await sendBinaryRequest(url, method, binaryBody, headers);
            const { statusCode, statusText, body } = await handleResponse(
              response
            );
            setField("responseStatus", `${statusCode} ${statusText}`);
            setField("responseBody", body);

            if (statusCode >= 400) {
              setField("error", `Error ${statusCode}: ${statusText}`);
            }

            addHistory(buildHistory())
            logHistory()
          } catch (err) {
            setField("error", (err as Error).message);
          } finally {
            setField("loading", false);
          }
        }
      }

      setField("error", ""); // Clear any error after success
    } catch (err) {
      setField("error", "An error occurred while sending the request.");
    } finally {
      setField("loading", false);
    }
  };

  const handleClear = () => {
    setField("method", "GET");
    setField("url", "");
    setField("responseStatus", "");
    setField("responseBody", "");
    setField("error", "");
    setField("loading", false);
    setField("binaryBody", null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-10 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-5xl overflow-auto">
        <RequestMethodSelector />

        {/* Request Body Input */}

        <RequestBody />

        <div className="flex gap-4 mt-4">
          <button
            className={`px-4 py-2 rounded text-white ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? `Sending...` : `Send`}
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        {loading ? (
          <LoadingWheel />
        ) : error ? (
          <div className="mt-4 text-red-600 font-medium">{error}</div>
        ) : (
          <ResponseViewer />
        )}
      </div>
    </div>
  );
}

export default FrontForm;
