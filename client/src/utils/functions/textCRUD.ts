import { TTextTitle, TText } from "types";

// CREATE

// READ
export async function getText(
  name: TTextTitle | "services"
): Promise<TText["stored_text"]> {
  const fetchName = name === "services" ? "pricing" : name;
  const response = await fetch(`/api/text?name=${fetchName}`);
  const textInfo = await response.json();
  return textInfo.stored_text;
}

// UPDATE

// DELETE
