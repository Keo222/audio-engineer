import { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

// Components
import UpdateForm from "./components/UpdateForm";

// Types
import type { TGenre } from "types";

// Layout
import AdminLayout from "layouts/AdminLayout";

// Styled Components
import { PageHeading } from "styled/typography";

const UpdateHeading = styled(PageHeading)`
  color: ${(props) => props.theme.color.highlight3};
`;

const AdminUpdateTrack = () => {
  // Get all Genres
  const [genreList, setGenreList] = useState<string[]>([]);
  const getGenres = async () => {
    const response = await fetch("/api/genres/");
    const allGenres: TGenre[] = await response.json();
    const sortedGenres = allGenres
      .map((g) => g.genre_name)
      .sort((a: string, b: string) =>
        a.toLowerCase() > b.toLowerCase() ? 1 : -1
      );
    setGenreList(sortedGenres);
  };
  useLayoutEffect(() => {
    getGenres();
  }, []);

  // Get track info from database
  const [trackName, setTrackName] = useState<string>();
  const [album, setAlbum] = useState<string>();
  const [artist, setArtist] = useState<string>();
  const [work, setWork] = useState<string>();
  const [year, setYear] = useState<number>();
  const [genre, setGenre] = useState<string>();
  const [featured, setFeatured] = useState<boolean>();
  const [spotify, setSpotify] = useState<string>();
  const [tidal, setTidal] = useState<string>();
  const [apple, setApple] = useState<string>();

  const { id } = useParams();

  const getTrackInfo = async (id: string) => {
    const fetch_url = `/api/tracks/single?id=${id}`;
    const response = await fetch(fetch_url);
    const trackInfo = await response.json();
    setTrackName(trackInfo.track_name);
    setAlbum(trackInfo.track_album);
    setArtist(trackInfo.track_artist);
    setWork(trackInfo.track_work);
    setYear(Number(trackInfo.track_year));
    setGenre(trackInfo.track_genre);
    setFeatured(trackInfo.track_featured);
    setSpotify(trackInfo.track_spotify);
    setTidal(trackInfo.track_tidal);
    setApple(trackInfo.track_apple);
  };
  useLayoutEffect(() => {
    if (typeof id !== "undefined") getTrackInfo(id);
  }, [id]);

  return (
    <AdminLayout>
      <Helmet>
        <title>JG Admin | Update Track</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <UpdateHeading>Update Track</UpdateHeading>
      <UpdateForm
        id={Number(id)}
        trackName={trackName || ""}
        album={album || ""}
        artist={artist || ""}
        work={work || ""}
        year={year || new Date().getFullYear()}
        genre={genre || ""}
        featured={!!featured}
        spotify={spotify || ""}
        tidal={tidal || ""}
        apple={apple || ""}
        genreList={genreList || ""}
      />
    </AdminLayout>
  );
};

export default AdminUpdateTrack;
