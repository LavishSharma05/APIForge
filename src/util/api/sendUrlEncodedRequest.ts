export type UrlEncodedField = {
  key: string;
  value: string;
};

export async function sendUrlEncodedRequest(
  url: string,
  method: string,
  fields: UrlEncodedField[],
  headers: Record<string, string> = {}
): Promise<Response> {
  const encodedBody = fields
    .map(
      (f) =>
        `${encodeURIComponent(f.key.trim())}=${encodeURIComponent(
          f.value.trim()
        )}`
    )
    .join("&");


  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
    body: encodedBody,
  });
}
