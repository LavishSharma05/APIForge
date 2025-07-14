import React from "react";
import useRequestStore from "@/store/requestStore";

function RequestBodyDropDown() {
  const bodyType = useRequestStore((state) => state.bodyType);
  const setField = useRequestStore((state) => state.setField);

  return (
    <div className="mt-4">
      <label
        htmlFor="bodyType"
        className="text-sm font-medium text-gray-700 block mb-1"
      >
        Body Type
      </label>
      <select
        id="bodyType"
        value={bodyType}
        onChange={(e) => setField("bodyType", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full"
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
