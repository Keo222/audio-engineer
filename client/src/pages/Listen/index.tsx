import { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// Types
import type { TPlayer, TWork, TTrack } from "utils/types";

// Imported Styled Components
import { PageHeading } from "styled/typography";
import {
  GenreSelect,
  StreamingServiceSelect,
  WorkSelect,
} from "./pageComponents/selects";
import TrackList from "./pageComponents/TrackList";

// Styled Components
const PageDiv = styled.div`
  margin-bottom: 10rem;
`;

const SelectsSection = styled.section`
  display: flex;
  width: clamp(250px, 85%, 1400px);
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

const Listen = () => {
  const [player, setPlayer] = useState<TPlayer>("Spotify");
  const [tracks, setTracks] = useState<TTrack[]>();
  const [currentGenre, setCurrentGenre] = useState<string>("All");
  const [work, setWork] = useState<TWork>("All");

  // Get tracks from DB
  useEffect(() => {
    async function getTracks() {
      try {
        const response = await fetch("/api/tracks/");
        const allTracks = await response.json();
        setTracks(allTracks);
      } catch (error) {
        console.error(error);
      }
    }
    getTracks();
  }, []);

  // Retrieves player from localStorage if it's there and adds it to localStorage when you leave the page
  useEffect(() => {
    const localPlayer = localStorage.getItem("player");
    if (
      localPlayer === "Spotify" ||
      localPlayer === "Tidal" ||
      localPlayer === "Apple"
    ) {
      setPlayer(localPlayer);
    }
  }, []);

  // Parse genres from tracks
  const getGenres = (trackArr: TTrack[] | undefined) => {
    if (trackArr) {
      const genreSet = new Set();
      trackArr.map((t: TTrack) => genreSet.add(t.track_genre));
      const genreList = Array.from(genreSet) as string[];
      return genreList;
    }
  };
  const genres = getGenres(tracks);

  return (
    <>
      <Helmet>
        <title>Joel Gardella | Listen</title>
      </Helmet>
      <PageDiv>
        <PageHeading>Listen</PageHeading>
        <SelectsSection aria-label="Track Controls">
          <StreamingServiceSelect player={player} setPlayer={setPlayer} />
          <WorkSelect work={work} setWork={setWork} />
          <GenreSelect genres={genres} setCurrentGenre={setCurrentGenre} />
        </SelectsSection>
        <TrackList
          genres={genres}
          tracks={tracks}
          currentGenre={currentGenre}
          work={work}
          player={player}
        />
      </PageDiv>
    </>
  );
};

export default Listen;
