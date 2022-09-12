import { TGenre } from "types";

// CREATE

// READ
export async function getGenres(): Promise<TGenre[]> {
  const response = await fetch("/api/genres/");
  const allGenres = await response.json();
  return allGenres;
}

// UPDATE

// DELETE
export const deleteGenre = async (name: string) => {
  let data = { name: name };
  try {
    await fetch("/api/genres", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err);
  }
};
