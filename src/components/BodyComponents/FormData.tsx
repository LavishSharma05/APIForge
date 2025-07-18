import React from "react";
import useRequestStore from "@/store/requestStore";

type FormField = {
  id: number;
  key: string;
  value: string | File;
  type: "text" | "file";
  description: string;
};

function FormData() {
  const formFields = useRequestStore((state) => state.formFields);
  const addFormField = useRequestStore((state) => state.addFormField);
  const removeFormField = useRequestStore((state) => state.removeFormField);
  const updateFormField = useRequestStore((state) => state.updateFormField);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Form Data</h2>
      {formFields.map((field: FormField) => (
        <div key={field.id} className="mb-4 flex items-start gap-2">
          {/* Key Input */}
          <input
            type="text"
            value={field.key}
            onChange={(e) => updateFormField(field.id, "key", e.target.value)}
            placeholder="Key"
            className="border p-2 rounded w-[150px]"
          />

          {/* Type Selector */}
          <select
            value={field.type}
            onChange={(e) => updateFormField(field.id, "type", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="text">Text</option>
            <option value="file">File</option>
          </select>

          {/* Value Input */}
          {field.type === "text" ? (
            <input
              key="text"
              type="text"
              value={typeof field.value === "string" ? field.value : ""}
              onChange={(e) =>
                updateFormField(field.id, "value", e.target.value)
              }
              placeholder="Value"
              className="border p-2 rounded w-[200px]"
            />
          ) : (
            <input
              key="file"
              type="file"
              onChange={(e) =>
                updateFormField(field.id, "value", e.target.files?.[0] ?? null)
              }
              className="border p-2 rounded"
            />
          )}

          {/* Description */}
          <input
            type="text"
            value={field.description}
            onChange={(e) =>
              updateFormField(field.id, "description", e.target.value)
            }
            placeholder="Description"
            className="border p-2 rounded w-[200px]"
          />

          {/* Remove Button */}
          <button
            onClick={() => removeFormField(field.id)}
            className="text-red-500 font-bold"
          >
            🗑
          </button>
        </div>
      ))}

      <button
        onClick={addFormField}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        ➕ Add Row
      </button>
    </div>
  );
}

export default FormData;
