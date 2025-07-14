export type FormField = {
  key: string;
  value: string | File;
  type: "text" | "file";
};

export async function sendFormDataRequest(
  url: string,
  method: "POST" | "PUT",
  fields: FormField[],
  headers: Record<string, string> = {}
): Promise<Response> {
  const formData = new FormData();

  fields.forEach((field) => {
    if (field.type === "file") {
      formData.append(field.key, field.value as File);
    } else {
      formData.append(field.key, field.value as string);
    }
  });

  if (headers["Content-Type"]) {
    delete headers["Content-Type"]; // Let browser handle it
  }

  return fetch(url, {
    method,
    body: formData,
    headers: headers,
  });
}
