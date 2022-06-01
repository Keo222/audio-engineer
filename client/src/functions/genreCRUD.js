// CREATE

// READ
export const getGenres = async () => {
  const response = await fetch("/api/genres/");
  const allGenres = await response.json();
  return allGenres;
};

// UPDATE

// DELETE
