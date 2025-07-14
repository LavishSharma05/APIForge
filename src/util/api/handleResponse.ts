export async function handleResponse(response: Response): Promise<{
  statusText: string;
  statusCode: number;
  body: string;
}> {
  const contentType = response.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  const parsedBody = typeof data === "string" ? data : JSON.stringify(data, null, 2);

  // Always return all response info — success or error
  return {
    statusCode: response.status,
    statusText: response.statusText,
    body: parsedBody,
  };
}

