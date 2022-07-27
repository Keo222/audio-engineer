import { Genre } from "types/types";

// CREATE

// READ
export async function getGenres(): Promise<Genre[]> {
  const response = await fetch("/api/genres/");
  const allGenres = await response.json();
  return allGenres;
}

// UPDATE

// DELETE
