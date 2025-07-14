import { UrlEncodedField } from "@/util/api/sendUrlEncodedRequest";

export function validateUrlEncodedFields(
  fields: UrlEncodedField[]
): string | null {
  for (const field of fields) {
    if (field.key.trim() === "") continue;
    if (field.value.trim() === "") {
      return `Value is required for key: "${field.key}"`;
    }
  }
  return null;
}
