import React from "react";
import useRequestStore from "@/store/requestStore";

function RequestBodyDropDown() {
  const bodyType = useRequestStore((state) => state.bodyType);
  const setField = useRequestStore((state) => state.setField);

  return (
    <div className="mt-4 w-full">
      <label
        htmlFor="bodyType"
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        Body Type
      </label>
      <select
        id="bodyType"
        value={bodyType}
        onChange={(e) => setField("bodyType", e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
