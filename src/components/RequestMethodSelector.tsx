import React from 'react';
import useRequestStore from '../store/requestStore';

function RequestMethodSelector() {
  const method = useRequestStore((state) => state.method);
  const url = useRequestStore((state) => state.url);
  const setField = useRequestStore((state) => state.setField);
 
  return (
    <div className="flex items-center gap-4 mb-4">
      {/* Method Dropdown */}
      <select
        id="method"
        name="method"
        className="border border-gray-300 rounded px-3 py-2"
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
        className="flex-grow border border-gray-300 rounded px-3 py-2"
        value={url}
        onChange={(e) => setField('url', e.target.value)}
      />
    </div>
  );
}

export default RequestMethodSelector;
