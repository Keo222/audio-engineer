import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Layout
import { AdminLayout } from "components/layouts";

// Types
import { Genre } from "types/types";

import TrackForm from "components/Admin/TrackForm";

// Styled Components
import { PageHeading } from "styled/typography";

const FormikTSAdminNewTrack = () => {
  // Info states
  const [name, setName] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [work, setWork] = useState("Mix");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [featured, setFeatured] = useState(false);
  const [spotify, setSpotify] = useState("");
  const [tidal, setTidal] = useState("");
  const [apple, setApple] = useState("");
  const [genresList, setGenresList] = useState([]);
  const [initValues, setInitValues] = useState({});

  const getGenres = async () => {
    const response = await fetch("/api/genres/");
    const allGenres = await response.json();
    const sortedGenres = allGenres
      .sort((a: Genre, b: Genre) =>
        a.genre_name.toLowerCase() > b.genre_name.toLowerCase() ? 1 : -1
      )
      .map((g: Genre) => g.genre_name);
    setGenresList(sortedGenres);
  };

  useEffect(() => {
    const topGenre = genresList[0] || "";
    const vals = {
      name: "",
      album: "",
      artist: "",
      year: "",
      genre: topGenre,
      work: "Mix",
      featured: false,
      spotifySrc: "",
      tidalSrc: "",
      appleSrc: "",
    };
    setInitValues(vals);
  }, [genresList]);

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    if (genresList !== []) {
      setGenre(genresList[0]);
      console.log(genresList);
    }
  }, [genresList]);

  const navigate = useNavigate();

  const addTrack = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let data = {
      name: name,
      artist: artist,
      work: work,
      year: year,
      genre: genre,
      featured: featured,
      spotify: spotify,
      tidal: tidal,
      apple: apple,
      album: album,
    };
    try {
      const res = await fetch("/api/tracks", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log(res.status);
      navigate("/admin/tracks");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <AdminLayout>
      <title>JG Admin | New Track</title>
      <PageHeading>Add Track</PageHeading>
      {genresList !== [] ? (
        <TrackForm
          initValues={{
            name: "",
            album: "",
            artist: "",
            year: "",
            genre: genresList[0],
            work: "Mix",
            featured: false,
            spotifySrc: "",
            tidalSrc: "",
            appleSrc: "",
          }}
          genreList={genresList}
        />
      ) : (
        <p>Please add genres first.</p>
      )}
    </AdminLayout>
  );
};

export default FormikTSAdminNewTrack;
