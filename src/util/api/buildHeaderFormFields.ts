type HeaderField = {
  id: string;
  key: string;
  value: string;
  description: string;
};

export function buildHeadersFromFields(fields: HeaderField[]): Record<string, string> {
  const headers: Record<string, string> = {};
  fields.forEach(({ key, value }) => {
    if (key.trim() && value.trim()) {
      headers[key.trim()] = value.trim();
    }
  });
  return headers;
}
