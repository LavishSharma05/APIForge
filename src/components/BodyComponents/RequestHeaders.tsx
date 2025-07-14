import useRequestStore from '@/store/requestStore';
import React from 'react';

type HeaderField = {
  id: number;
  key: string;
  value: string;
  description: string;
};

function RequestHeaders() {
  const headerFields = useRequestStore((state) => state.headerFields);
  const addHeaderField = useRequestStore((state) => state.addHeaderField);
  const removeHeaderField = useRequestStore((state) => state.removeHeaderField);
  const updateHeaderField = useRequestStore((state) => state.updateHeaderField);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Headers</h1>

      {headerFields.map((field: HeaderField) => (
        <div
          key={field.id}
          className="mb-3 flex flex-col md:flex-row md:items-center gap-2"
        >
          <input
            type="text"
            placeholder="Key"
            className="px-3 py-2 rounded-md border border-gray-300 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={field.key}
            onChange={(e) => updateHeaderField(field.id, 'key', e.target.value)}
          />

          <input
            type="text"
            placeholder="Value"
            className="px-3 py-2 rounded-md border border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={field.value}
            onChange={(e) => updateHeaderField(field.id, 'value', e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            className="px-3 py-2 rounded-md border border-gray-300 w-full md:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={field.description}
            onChange={(e) => updateHeaderField(field.id, 'description', e.target.value)}
          />

          <button
            onClick={() => removeHeaderField(field.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addHeaderField}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        + Add Header
      </button>

      <p className="text-sm text-gray-500 mt-2">
        Headers are used to pass additional metadata with the request.
      </p>
    </div>
  );
}

export default RequestHeaders;
