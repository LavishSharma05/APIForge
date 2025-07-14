import React from "react";
import useRequestStore from "@/store/requestStore";

type UrlFormField = {
  id: number;
  key: string;
  value: string;
  description: string;
};

function UrlEncodedData() {
  const urlEncodedFields = useRequestStore((state) => state.urlEncodedFields);
  const addUrlEncodedField = useRequestStore(
    (state) => state.addUrlEncodedField
  );
  const removeUrlEncodedField = useRequestStore(
    (state) => state.removeUrlEncodedField
  );
  const updateUrlEncodedField = useRequestStore(
    (state) => state.updateUrlEncodedField
  );

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">x-www-form-urlencoded</h2>
      {urlEncodedFields.map((field: UrlFormField) => (
        <div key={field.id} className="mb-4 flex items-start gap-2">
          {/* Key Input */}
          <input
            type="text"
            value={field.key}
            onChange={(e) =>
              updateUrlEncodedField(field.id, "key", e.target.value)
            }
            placeholder="Key"
            className="border p-2 rounded w-[150px]"
          />

          {/* Value Input */}

          <input
            type="text"
            value={field.value}
            onChange={(e) =>
              updateUrlEncodedField(field.id, "value", e.target.value)
            }
            placeholder="Value"
            className="border p-2 rounded w-[200px]"
          />

          {/* Description */}
          <input
            type="text"
            value={field.description}
            onChange={(e) =>
              updateUrlEncodedField(field.id, "description", e.target.value)
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
