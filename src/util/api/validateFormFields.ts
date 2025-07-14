import { FormField } from "@/util/api/sendFormDataRequest";

export function validateFormFields(fields: FormField[]): string | null {
  for (const field of fields) {
    if (field.key.trim() === "") continue;

    if (field.type === "file" && !(field.value instanceof File)) {
      return `File is required for key: ${field.key}`;
    }

    if (
      field.type === "text" &&
      typeof field.value === "string" &&
      field.value.trim() === ""
    ) {
      return `Value is required for key: ${field.key}`;
    }
  }

  return null;
}
