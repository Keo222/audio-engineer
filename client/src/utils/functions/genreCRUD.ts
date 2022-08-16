import { TGenre } from "utils/types";

// CREATE

// READ
export async function getGenres(): Promise<TGenre[]> {
  const response = await fetch("/api/genres/");
  const allGenres = await response.json();
  return allGenres;
}

// UPDATE

// DELETE
