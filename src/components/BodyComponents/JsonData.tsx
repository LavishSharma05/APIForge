import useRequestStore from '@/store/requestStore';
import React from 'react'
function JsonData() {
const body = useRequestStore((state) => state.requestBody);
  const setField = useRequestStore((state) => state.setField);
  return (
    <div>
      <textarea
        id="request-body"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono min-h-[150px]"
        rows={6}
        value={body}
        onChange={(e) => setField("requestBody", e.target.value)}
        placeholder='Enter JSON body like { "name": "John" }'
      />
    </div>
  )
}

export default JsonData
