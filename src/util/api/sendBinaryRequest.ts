export async function sendBinaryRequest(
  url: string,
  method: "POST" | "PUT",
  file: Blob,
  headers: Record<string, string> = {}
): Promise<Response> {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      ...headers,
    },
    body: file,
  });
}
