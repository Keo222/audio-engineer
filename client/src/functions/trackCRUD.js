// CREATE

// READ
export const getTracks = async () => {
  const response = await fetch("/api/tracks/");
  const allTracks = await response.json();
  return allTracks;
};

// UPDATE

// DELETE
export const deleteTrack = async (deleteId) => {
  let data = { id: deleteId };
  try {
    const response = await fetch("/api/tracks", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(data),
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
