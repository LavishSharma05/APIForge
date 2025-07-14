import React from "react";

function LoadingWheel() {
  return (
    <div className="flex items-center gap-2 mt-4 text-blue-500">
      <svg
        className="animate-spin h-5 w-5 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
      <span>Loading...</span>
    </div>
  );
}

export default LoadingWheel;
