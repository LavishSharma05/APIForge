import React from 'react';
import useRequestStore from '../store/requestStore';

function RequestMethodSelector() {
  const method = useRequestStore((state) => state.method);
  const url = useRequestStore((state) => state.url);
  const setField = useRequestStore((state) => state.setField);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      {/* Method Dropdown */}
      <select
        id="method"
        name="method"
        className="w-full sm:w-32 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={method}
        onChange={(e) => setField('method', e.target.value)}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>

      {/* URL Input */}
      <input
        type="text"
        placeholder="https://example.com/api/blog"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={url}
        onChange={(e) => setField('url', e.target.value)}
      />
    </div>
  );
}

export default RequestMethodSelector;
