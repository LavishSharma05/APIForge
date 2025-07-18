import useRequestStore from "@/store/requestStore";
import React from "react";
import RequestBodyDropDown from "./RequestBodyDropDown";
import JsonData from "./BodyComponents/JsonData";
import FormData from "./BodyComponents/FormData";
import UrlEncodedData from "./BodyComponents/url_encodedBody";
import BinaryData from "./BodyComponents/BinaryData";
import RequestHeaders from "./BodyComponents/RequestHeaders";

function RequestBody() {
  const { headersVisible, setField, bodyType } = useRequestStore();

  return ( 
    <div className="flex flex-col space-y-2 mt-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">
          <RequestBodyDropDown />
        </div>

        <button
          onClick={() => {
            const newVisibility = !headersVisible;
            setField("headersVisible", newVisibility);
            if (!newVisibility) {
              setField("headerFields", [{ id: 1,key: "", value: "", description: "" }]);
            }
          }}
          className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
        >
          {headersVisible ? "Hide Headers" : "Show Headers"}
        </button>
      </div>

      {headersVisible && <RequestHeaders />}

      <small className="text-xs text-gray-500">
        Body will be sent as {bodyType}. Make sure the format is valid.
      </small>

      {bodyType === "none" && (
        <p className="text-sm text-gray-500">
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
