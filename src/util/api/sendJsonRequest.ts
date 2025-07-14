export async function sendJsonRequest(
  url: string,
  method: "POST" | "PUT",
  rawBody: string,
  headers: Record<string, string> = {}
): Promise<Response> {
  const parsedBody = JSON.parse(rawBody.trim());

  return await fetch(url, {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedBody),
  });
}