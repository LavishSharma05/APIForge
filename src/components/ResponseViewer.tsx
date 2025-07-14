import useRequestStore from "@/store/requestStore";

function ResponseViewer() {
  const responseStatus = useRequestStore((state) => state.responseStatus);
  const responseBody = useRequestStore((state) => state.responseBody);

  return (
    <div className="border rounded bg-gray-100 p-4 mt-6 w-full max-h-64 overflow-auto">
      <div
        className={`font-semibold mb-2 ${
          responseStatus.startsWith("2")
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {responseStatus}
      </div>
      <div className="font-mono text-sm whitespace-pre-wrap break-words">
        {responseBody}
      </div>
    </div>
  );
}

export default ResponseViewer;
