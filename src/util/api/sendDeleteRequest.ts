

export async function sendDeleteRequest(url: string,headers: Record<string,string>={}): Promise<Response> {
  return await fetch(url, {
    method: "DELETE",
    headers,
  });
}
