import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styled Components
import { PageHeading } from "../../styled/typography";
import {
  StyledForm,
  InputGroup,
  InputLabel,
  TextInput,
  SelectDiv,
  RadioDiv,
  SubmitButton,
  ErrorMessage,
} from "../../styled/forms";

const AdminTracks = () => {
  // Error states
  const [nameError, setNameError] = useState(false);
  const [albumError, setAlbumError] = useState(false);
  const [artistError, setArtistError] = useState(false);
  const [spotifyError, setSpotifyError] = useState(false);
  const [tidalError, setTidalError] = useState(false);
  const [appleError, setAppleError] = useState(false);

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
  const [genreList, setGenreList] = useState([]);

  const getGenres = async () => {
    const response = await fetch("/api/genres/");
    const allGenres = await response.json();
    const sortedGenres = allGenres
      .sort((a, b) =>
        a.genre_name.toLowerCase() > b.genre_name.toLowerCase() ? 1 : -1
      )
      .map((g) => g.genre_name);
    setGenreList(sortedGenres);
  };

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    if (genreList !== []) {
      setGenre(genreList[0]);
      console.log(genreList);
    }
  }, [genreList]);

  const navigate = useNavigate();

  const addTrack = async (e) => {
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
      let errorPresent = false;
      if (name.length > 255) {
        setNameError(true);
        errorPresent = true;
      } else {
        setNameError(false);
      }
      if (album.length > 255) {
        setAlbumError(true);
        errorPresent = true;
      } else {
        setAlbumError(false);
      }
      if (artist.length > 255) {
        setArtistError(true);
        errorPresent = true;
      } else {
        setArtistError(false);
      }
      if (!/\/[\d\w]+[?]/gm.test(spotify)) {
        setSpotifyError(true);
        errorPresent = true;
      } else {
        setSpotifyError(false);
      }
      if (!/\/[\d]+$/gm.test(tidal)) {
        setTidalError(true);
        errorPresent = true;
      } else {
        setTidalError(false);
      }
      if (!/\/[\d\w-%&]+\/[\d]+[?i=]{3}[\d]+/gm.test(apple)) {
        setAppleError(true);
        errorPresent = true;
      } else {
        setAppleError(false);
      }
      if (errorPresent) {
        return;
      }
      const res = await fetch("/api/tracks", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log(res.status);
      navigate("/admin/tracks");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <title>JG Admin | New Track</title>
      <PageHeading>Add Track</PageHeading>
      <StyledForm onSubmit={(e) => addTrack(e)}>
        <InputGroup>
          <InputLabel htmlFor="name">Track Name:</InputLabel>
          <TextInput
            type="text"
            name="name"
            id="name"
            placeholder='ex: "Bohemian Rhapsody"'
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameError && <ErrorMessage>Track name too long.</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="album">Album:</InputLabel>
          <TextInput
            type="text"
            name="album"
            id="album"
            placeholder='ex: "A Night at the Opera"'
            onChange={(e) => setAlbum(e.target.value)}
            required
          />
          {albumError && <ErrorMessage>Album name too long.</ErrorMessage>}
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="artist">Artist:</InputLabel>
          <TextInput
            type="text"
            name="artist"
            id="artist"
            placeholder='ex: "Queen"'
            onChange={(e) => setArtist(e.target.value)}
            required
          />
          {artistError && (
            <ErrorMessage>Artist name too long.</ErrorMessage>
          )}
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="year">Year:</InputLabel>
          <TextInput
            type="number"
            min="1900"
            max="2200"
            step="1"
            name="year"
            id="year"
            placeholder='ex: "2000"'
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </InputGroup>

        <SelectDiv>
          <InputGroup>
            <InputLabel htmlFor="genre">Genre:</InputLabel>
            <select
              name="genre"
              id="genre"
              onChange={(e) => setGenre(e.target.value)}
            >
              {genreList.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="work">Type of Work:</InputLabel>
            <select
              name="work"
              id="work"
              onChange={(e) => setWork(e.target.value)}
            >
              <option value="Mix">Mix</option>
              <option value="Mix + Edit">Mix + Edit</option>
              <option value="Master">Master</option>
              <option value="Mix & Master">Mix & Master</option>
              <option value="Production">Production</option>
            </select>
          </InputGroup>
        </SelectDiv>

        <RadioDiv>
          <p>Featured:</p>
          <input
            type="radio"
            id="featured"
            name="featured"
            value="yes"
            checked={featured === true}
            onChange={() => setFeatured(true)}
          />
          <label htmlFor="featured">Yes</label>

          <input
            type="radio"
            id="not-featured"
            name="featured"
            value="no"
            checked={featured === false}
            onChange={() => setFeatured(false)}
          />
          <label htmlFor="not-featured">No</label>
        </RadioDiv>

        <InputGroup>
          <InputLabel htmlFor="spotify">Spotify Source:</InputLabel>
          <TextInput
            type="text"
            name="spotify"
            id="spotify"
            placeholder='ex: "https://open.spotify.com/track/5eIDxmWYxRA0HJBYM9bIIS?si=668accca5b864e0b"'
            onChange={(e) => setSpotify(e.target.value)}
          />
          {spotifyError && (
            <ErrorMessage>Invalid Spotify source.</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="tidal">Tidal Source:</InputLabel>
          <TextInput
            type="text"
            name="tidal"
            id="tidal"
            placeholder='ex: "https://tidal.com/browse/track/77814875"'
            onChange={(e) => setTidal(e.target.value)}
          />
          {tidalError && (
            <ErrorMessage>Invalid Tidal source.</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="apple">Apple Music Source:</InputLabel>
          <TextInput
            type="text"
            name="apple"
            id="apple"
            placeholder='ex: "https://music.apple.com/us/album/bohemian-rhapsody/1440806041?i=1440806768"'
            onChange={(e) => setApple(e.target.value)}
          />
          {appleError && (
            <ErrorMessage>Invalid Apple Music source.</ErrorMessage>
          )}
        </InputGroup>

        <SubmitButton type="submit">Add Track</SubmitButton>
      </StyledForm>
    </div>
  );
};

export default AdminTracks;
