import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// Types
import type { TGenre } from "utils/types";

// Imported Styled Components
import { PageHeading } from "styled/typography";
import {
  StyledForm,
  InputGroup,
  InputLabel,
  TextInput,
  SelectDiv,
  RadioDiv,
  RadioGroup,
  SubmitButton,
} from "styled/forms";

// Styled Components
const UpdateHeading = styled(PageHeading)`
  color: ${(props) => props.theme.color.highlight3};
`;

const AdminUpdateTrack = () => {
  const [name, setName] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [work, setWork] = useState("");
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
    const sortedGenres = allGenres.sort((a: TGenre, b: TGenre) =>
      a.genre_name.toLowerCase() > b.genre_name.toLowerCase() ? 1 : -1
    );
    setGenreList(sortedGenres);
  };

  useEffect(() => {
    getGenres();
  }, []);

  const { id } = useParams();

  const getTrackInfo = async (id: string) => {
    const fetch_url = `/api/tracks/single?id=${id}`;
    const response = await fetch(fetch_url);
    const trackInfo = await response.json();
    console.log("got track info!");
    setName(trackInfo.track_name);
    setAlbum(trackInfo.track_album);
    setArtist(trackInfo.track_artist);
    setWork(trackInfo.track_work);
    setYear(trackInfo.track_year);
    setGenre(trackInfo.track_genre);
    setFeatured(trackInfo.track_featured);
    setSpotify(trackInfo.track_spotify);
    setTidal(trackInfo.track_tidal);
    setApple(trackInfo.track_apple);
  };
  useEffect(() => {
    if (typeof id !== "undefined") getTrackInfo(id);
  }, [id]);

  const navigate = useNavigate();

  const updateTrack = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let data = {
      id: id,
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
        method: "PUT",
        body: JSON.stringify(data),
      });
      console.log(res.status);
      navigate("/admin/tracks");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <title>JG Admin | Update Track</title>
      <UpdateHeading>Update Track</UpdateHeading>

      <StyledForm onSubmit={(e) => updateTrack(e)}>
        <InputGroup>
          <InputLabel htmlFor="name">Track Name:</InputLabel>
          <TextInput
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="album">Album:</InputLabel>
          <TextInput
            type="text"
            name="album"
            id="album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="artist">Artist:</InputLabel>
          <TextInput
            type="text"
            name="artist"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="year">Year:</InputLabel>
          <TextInput
            type="number"
            min="1996"
            max="2099"
            step="1"
            name="year"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </InputGroup>
        <SelectDiv>
          <InputGroup>
            <InputLabel htmlFor="genre">Genre:</InputLabel>
            <select
              name="genre"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {genreList.map((g: TGenre) => (
                <option value={g.genre_name}>{g.genre_name}</option>
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
          <RadioGroup>
            <input
              type="radio"
              id="featured"
              name="featured"
              value="yes"
              checked={featured === true}
              onChange={() => setFeatured(true)}
            />
            <label htmlFor="featured">Yes</label>
          </RadioGroup>
          <RadioGroup>
            <input
              type="radio"
              id="not-featured"
              name="featured"
              value="no"
              checked={featured === false}
              onChange={() => setFeatured(false)}
            />
            <label htmlFor="not-featured">No</label>
          </RadioGroup>
        </RadioDiv>

        <InputGroup>
          <InputLabel htmlFor="spotify">Spotify Source:</InputLabel>
          <TextInput
            type="text"
            name="spotify"
            id="spotify"
            value={spotify}
            onChange={(e) => setSpotify(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="tidal">Tidal Source:</InputLabel>
          <TextInput
            type="text"
            name="tidal"
            id="tidal"
            value={tidal}
            onChange={(e) => setTidal(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="apple">Apple Music Source:</InputLabel>
          <TextInput
            type="text"
            name="apple"
            id="apple"
            value={apple}
            onChange={(e) => setApple(e.target.value)}
          />
        </InputGroup>

        <SubmitButton type="submit">Update Track</SubmitButton>
      </StyledForm>
    </div>
  );
};

export default AdminUpdateTrack;
