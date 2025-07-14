export async function sendGetRequest(url: string,headers: Record<string,string>={}): Promise<Response> {
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
}