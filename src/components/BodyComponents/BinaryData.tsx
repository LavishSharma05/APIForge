import useRequestStore from '@/store/requestStore';
import React from 'react';

function BinaryData() {
  const binaryBody = useRequestStore((state) => state.binaryBody);
  const setField = useRequestStore((state) => state.setField);

  return (
    <div className="mt-6 p-4 rounded-xl border border-gray-300 shadow-sm bg-white dark:bg-zinc-900 dark:border-zinc-700">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Binary File Input</h2>

      <input
        type="file"
        accept="application/pdf,image/*,video/*,audio/*"
        onChange={(e) => setField("binaryBody", e.target.files?.[0] ?? null)}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-700
          dark:text-gray-300"
      />

      {binaryBody && (
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          Selected: <strong>{binaryBody.name}</strong> ({binaryBody.type})
        </p>
      )}

      <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
        Supported formats: PDF, Images, Videos, Audio files
      </p>
    </div>
  );
}

export default BinaryData;
